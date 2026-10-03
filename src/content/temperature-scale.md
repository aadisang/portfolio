---
title: A Better Temperature System
description: A temperature scale calibrated against historical weather and the way people actually report feeling it.
published: 2026-04-17
---

Let me preface this by saying that inventing a unit of measurement is obviously a fool's errand. Adoption is what gives a unit meaning. Like language, a unit works because other people agree to use it.

Still, as a thought experiment, I think we can do better than Fahrenheit or Celsius for everyday weather.

## The problem

Most familiar SI units have a useful decimal structure:

| Prefix | Factor |
| ------ | -----: |
| kilo   |  1,000 |
| hecto  |    100 |
| deca   |     10 |
| (base) |      1 |
| deci   |    0.1 |
| centi  |   0.01 |
| milli  |  0.001 |

Temperature is different. Celsius is excellent for science and convenient for water, but its everyday outdoor range is awkward for humans. Fahrenheit is more practical in one respect: its familiar weather range looks closer to a 0-to-100 scale. Neither scale is wrong. Neither scale is calibrated to what a person means when they say, “This feels awful.”

The missing variable is humidity. Thirty degrees Celsius in dry air and thirty degrees Celsius in saturated air are not the same experience. Wind, radiant heat, clothing, activity, acclimatization, and whether a person can open a window matter too.

So the question is not “What should replace Celsius?” It is:

> Can we make an everyday score whose center and spread come from observed human responses, while retaining the physical variables needed to reproduce it?

## Use the right data for each job

No single historical dataset can answer this. The datasets measure different things.

### 1. Human response: ASHRAE Global Thermal Comfort Database II

The primary calibration source should be the [ASHRAE Global Thermal Comfort Database II](https://datadryad.org/dataset/doi:10.6078/D1F671). Its records come from real occupied buildings rather than climate chambers. The current 2.1 release contains 109,033 entries, including subjective votes paired with instrumental measurements and outdoor observations where available.

The useful fields include:

- air temperature (`ta`)
- operative temperature (`top`)
- relative humidity (`rh`)
- globe and radiant temperature
- air speed
- clothing insulation (`clo`)
- metabolic rate (`met`)
- thermal sensation vote (`thermal_sensation`), from -3 cold to +3 hot
- thermal acceptability and preference
- fan, window, blind, door, and heater state
- outdoor temperature, humidity, and running-mean temperature

This is the part that makes the proposal about behavior rather than water. Someone answered a question about how they felt while those conditions were measured. The data also records some of the actions people took to change those conditions.

The database is not a perfect sample of humanity. It over-represents buildings and people who were studied, and it is not a direct survey of outdoor weather. That is a limitation to report, not a reason to substitute a convenient physical reference point.

### 2. Historical weather: HadISD

The [HadISD global sub-daily station dataset](https://www.metoffice.gov.uk/hadobs/hadisd/) supplies observed station histories. Its final version contains 10,405 selected stations with quality-controlled temperature and dew-point measurements spanning 1931 through August 2025. It is designed to retain extremes, but it has not been homogenized, so long-term trend analysis needs care.

HadISD tells us what was actually measured at stations. It is sparse and geographically uneven, which makes it unsuitable by itself for a global human-exposure distribution.

### 3. Complete spatial coverage: ERA5

The [ERA5 hourly reanalysis](https://cds.climate.copernicus.eu/datasets/reanalysis-era5-single-levels-timeseries?tab=overview) provides global hourly estimates from 1940 onward on a 0.25-degree atmospheric grid. Use its 2 m air temperature and dew point to reconstruct humidity, and its wind and radiation fields when calculating a heat-stress index.

ERA5 is not a thermometer network. It is a physics-based reconstruction that assimilates observations, and its uncertainty changes with the observing system. It is useful because it fills the spatial gaps between stations. HadISD is useful because it keeps us honest about the difference between a modelled field and an observation.

## What “humid temperature” should mean

Relative humidity by itself is a bad number to put on a human scale. Fifty percent relative humidity at 10 °C and fifty percent at 35 °C contain very different amounts of water vapor.

The input should therefore include air temperature and vapor pressure, calculated from temperature and dew point. For an outdoor safety reading, the physical summary should be a heat-stress index such as **wet-bulb globe temperature** or **UTCI**:

- WBGT accounts for humidity, air movement, radiant heat, and air temperature. OSHA gives the outdoor form as `0.7 natural wet-bulb + 0.2 globe + 0.1 dry-bulb`.
- UTCI uses air temperature, humidity, wind, and mean radiant temperature and reports categories from cold stress to heat stress.

Those indices describe the environment. They do not, by themselves, describe what a particular population will say or do. That is why they should be inputs to the behavioral model, not the final scale.

## The actual 0-to-100 proposal

Call the result the **ambient response index**, written **ARI**.

The ARI is a score, not a new physical unit. It is based on a model trained on the ASHRAE field data.

### Step 1: Predict a thermal sensation

Train an ordinal regression model on the database's thermal sensation vote. The minimum environmental feature set is:

```text
air temperature
relative humidity or vapor pressure
operative or radiant temperature
air speed
clothing insulation
metabolic rate
outdoor running-mean temperature
climate, season, and building ventilation mode
```

The target is the reported sensation from -3 (cold) through 0 (neutral) to +3 (hot). Keep the outcome ordinal rather than pretending that the distance from -3 to -2 is exactly the same as the distance from +2 to +3.

For a public weather display, hold clothing and activity at a published reference state and use local outdoor conditions as the environmental inputs. For a building display, use measured clothing/activity when available. The same scale can then mean “how this environment is likely to feel under the reference person,” not “a claim about every person's body.”

The model produces a continuous expected sensation score `s`, even though the training votes are categories. Let `mu` and `sigma` be the mean and standard deviation of the _observed human votes_ across the frozen reference population and reference conditions. Using the observed spread, rather than the narrower spread of model predictions, prevents a cautious model from making every unusual input look extreme.

### Step 2: Make 50 human-normal

Standardize the prediction:

```text
z = (s - mu) / sigma
```

Then map the second standard deviation to the endpoints:

```text
ARI = 50 + 25 × z
```

Finally, clamp only for display:

```text
display ARI = min(100, max(0, ARI))
```

This gives the scale a clear statistical meaning:

| ARI | Meaning                                                          |
| --: | ---------------------------------------------------------------- |
|   0 | two standard deviations colder than the reference human response |
|  25 | one standard deviation colder                                    |
|  50 | reference midpoint: ordinary/neutral response                    |
|  75 | one standard deviation hotter                                    |
| 100 | two standard deviations hotter                                   |

The unclamped value should still be retained internally. A value of 112 is more informative than silently turning an exceptional heat event into an ordinary 100.

This is the “second standard deviation” version of the idea. It is better than using a raw minimum and maximum because records are not meaningful anchors. It is also better than assuming a normal distribution without checking: the published version should report the empirical quantiles alongside the mean and standard deviation. If the response distribution is badly skewed, replace the symmetric `mu ± 2 sigma` endpoints with the observed 2.5th and 97.5th percentiles, while keeping 50 as the median reference response.

## First fit

I fit an exploratory version against ASHRAE Database II v2.1. The fit used 46,784 records with complete values for air temperature, relative humidity, air speed, clothing, metabolic rate, running-mean outdoor temperature, and thermal sensation. Records were split by building, not by row: 35,719 records for training and 11,065 records from held-out buildings for testing.

The model was a six-feature ordinal logistic regression. Inputs were standardized using training-set statistics. On held-out buildings it reached 40.1% exact thermal-sensation accuracy and 0.91 mean absolute error. That is useful signal, but not good enough to call this a finished universal comfort model. It also predicts indoor sensation, not outdoor behavior.

For this first frozen reference, the held-out human votes had:

```text
mu = 0.2472 sensation units
sigma = 1.2823 sensation units
```

Those numbers are the current calibration constants for ARI-1. The dataset version, required columns, building-level split, and model family are part of the definition; changing any of them requires a new metric version.

## A Dallas test

The National Weather Service observation for Dallas Love Field used for this test reported 33.9 °C air temperature, 18.9 °C dew point, 41% relative humidity, 10 mph wind, and a 35.5 °C heat index.

The comfort model cannot safely treat 10 mph outdoor wind as indoor air speed. Its training data is mostly occupied-building measurements, where air speed is much lower. For a deliberately conservative first test, I used a reference person with 1.0 m/s air speed, 0.5 clo clothing, 1.2 met activity, and a 25 °C seven-day running-mean temperature. With those assumptions, the model predicts:

```text
expected sensation: +1.295 (warm)
most likely vote:   +1
ARI:                70.4
```

That passes the basic sanity check: Dallas is clearly on the warm side, but not at the top of a scale whose endpoints represent two standard deviations of human sensation. If I pass the raw 4.47 m/s wind into the indoor model, the result is an invalid extrapolation and changes materially. That is evidence that this model is not yet an outdoor-weather metric.

ARI-1 therefore works as a first **indoor comfort score**. It does not yet work as a general human weather score. The next model needs outdoor observations, radiant temperature, solar exposure, and actual adaptive actions before it can claim that job.

## What the number means

An example display could look like this:

```text
ARI 82 / 31 °C / 62% RH
Warm-to-hot for the reference person
```

The Celsius reading preserves scientific interoperability. Relative humidity remains visible because the model used it. ARI supplies the interpretation that a person is likely to care about.

The score is not a percentage, and it is not a medical warning. A high ARI does not mean that 82 percent of people will be harmed. For occupational exposure, use an appropriate WBGT or heat-stress standard, including workload, clothing, and acclimatization. For health messaging, the threshold should be validated separately against health outcomes rather than inferred from comfort votes.

## How to fit it without fooling ourselves

The model needs stricter validation than a single random train/test split.

1. Freeze a version of the ASHRAE database and record the exact download date.
2. Remove duplicate rows and records without a thermal sensation vote or usable environmental inputs.
3. Split by study, building, and subject where identifiers allow it. Do not let records from the same person appear in both training and test sets.
4. Report performance separately by climate, season, ventilation mode, age group, and gender when sample sizes allow.
5. Compare the model with PMV, UTCI, WBGT, and a temperature-only baseline.
6. Test whether it predicts not only sensation, but acceptability, preference, and recorded behavior such as fan, window, heater, or blind changes.
7. Calibrate the final `mu` and `sigma` on the held-out reference population, then freeze them for a published scale version.

The model should also be recalibrated against newer observations. The historical weather datasets can keep growing; the meaning of the score should not move silently underneath users. Version `ARI-1` can have one fixed reference population and parameters, while `ARI-2` can be released as a deliberate update.

## The uncomfortable conclusion

There is no universal human temperature. People adapt. A person in Singapore, a person in Helsinki, an office worker, a construction worker, and a person sitting quietly at home can receive the same air temperature and report different experiences. The ASHRAE database itself shows that climate, building type, ventilation mode, clothing, activity, and personal control matter.

That does not make a human-facing scale impossible. It means the scale must say whose behavior it learned, under which conditions, and which variables it used.

The proposal is therefore not “replace Celsius with a nicer number.” It is:

- retain Celsius, Kelvin, and the physical measurements;
- calculate humidity in a thermodynamically meaningful way;
- use real field responses to fit the human interpretation;
- define 50 from the reference response distribution;
- define 0 and 100 as two standard deviations from that center;
- validate against actions and safety outcomes separately.

That is a defensible measurement design. It is no longer based on water. It is based on people, historical observations, and an explicit statistical choice.

## Sources

- [ASHRAE Global Thermal Comfort Database II, Dryad dataset](https://datadryad.org/dataset/doi:10.6078/D1F671)
- [ASHRAE Global Thermal Comfort Database II official repository and codebook](https://github.com/CenterForTheBuiltEnvironment/ashrae-db-II)
- [Development of the ASHRAE Global Thermal Comfort Database II, UC Berkeley](https://escholarship.org/uc/item/0dh6c67d)
- [HadISD global sub-daily station dataset, Met Office](https://www.metoffice.gov.uk/hadobs/hadisd/)
- [ERA5 hourly time-series data, Copernicus Climate Change Service](https://cds.climate.copernicus.eu/datasets/reanalysis-era5-single-levels-timeseries?tab=overview)
- [OSHA Technical Manual: Wet Bulb Globe Temperature](https://www.osha.gov/otm/section-3-health-hazards/chapter-4?itid=lk_inline_enhanced-template)
- [UTCI project](https://utci.org/)
- [National Weather Service Dallas Love Field observation used in the test](https://tgftp.nws.noaa.gov/weather/current/KDAL.html)
