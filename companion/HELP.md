# Stream Delay Module

This module allows you to generate timestamps with a configurable delay, which is useful for stream timing and scheduling.

## Configuration
* **Delay Hours** - Number of hours to delay the timestamp (0-23)
* **Delay Minutes** - Number of minutes to delay the timestamp (0-59)
* **Delay Seconds** - Number of seconds to delay the timestamp (0-59)

## Available Variables
* **$(streamdelay:delayed_time)** - Outputs the current time plus the configured delay in ISO format (YYYY-MM-DDTHH:mm:ss.000)

## Use Cases
* Schedule stream events relative to the current time
* Coordinate delayed broadcasts
* Sync timestamps across different timezones with offset
* Generate future timestamps for stream overlays

## Example
If current time is 14:30:00 and you configure:
* Hours: 1
* Minutes: 30
* Seconds: 0

The delayed_time variable will show 16:00:00 (current time + 1h30m)
