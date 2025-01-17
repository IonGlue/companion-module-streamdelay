# companion-module-streamdelay

This module for Companion generates timestamps with configurable delay for stream timing.

## Features
- Configure delay in hours, minutes, and seconds
- Updates timestamp every second
- Provides a variable with the delayed timestamp

## Getting Started
1. Add the module to your Companion instance
2. Configure the desired delay in hours, minutes, and seconds
3. Use the `$(streamdelay:delayed_time)` variable in your buttons or other modules

## Variables
- `$(streamdelay:delayed_time)` - Current time with configured delay (format: YYYY-MM-DDTHH:mm:ss.000)
