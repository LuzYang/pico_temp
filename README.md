[README_Version2.md](https://github.com/user-attachments/files/23797795/README_Version2.md)
```markdown
# pico_temp

A lightweight temperature data collection and demo template for Raspberry Pi Pico (and compatible boards).

## Overview

pico_temp provides example MicroPython scripts, configuration tips, and usage patterns to quickly get temperature sensing running on a Pico or Pico W. It is intended as a starting point you can adapt to different sensors (DS18B20, DHT22, analog sensors) or extend with networking (HTTP/MQTT) on Pico W.

## Features

- Example code to read temperature on a Raspberry Pi Pico
- Serial output and optional local file logging (CSV)
- Template-based structure for swapping sensors or adding network upload
- Minimal MicroPython dependencies for easy deployment

## Requirements

- Hardware: Raspberry Pi Pico, Pico W, or compatible board
- Sensor (example): DS18B20, DHT22, or analog temperature sensor
- Software: MicroPython flashed on the Pico
- Optional tools: Thonny, ampy, rshell, or picotool to copy files to the device

## Installation

1. Flash MicroPython firmware to your Pico (follow the official Raspberry Pi instructions).
2. Use Thonny or another tool to copy scripts from this repo to the Pico (device root or chosen directory).
3. Upload any sensor libraries you need (e.g., onewire, ds18x20, dht).

Example with Thonny:
- Open Thonny, set the interpreter to “MicroPython (Raspberry Pi Pico)”.
- Save the example script (e.g., main.py) to the device.

## Configuration

Edit the script top-level settings to match your setup:
- sample_interval: reading interval in seconds
- sensor_type: "DS18B20", "DHT22", or "ADC"
- output_mode: "serial", "file", or "network"
- file_name: (for CSV logging) filename on the device

## Usage

Place the example main.py on the Pico and reboot. The script will read the temperature according to configuration and print readings to the serial console. If enabled, it will append readings to a CSV file or send them over the network (Pico W).

Typical serial output:
- Timestamped temperature readings printed every sample interval.

Optional extensions:
- Save data to CSV on the Pico filesystem
- Use Pico W to publish readings to an HTTP endpoint or MQTT broker

## Example main.py (simple snippet)

```python
# main.py - simple temperature read loop (example)
import time

def read_temperature():
    # Replace with actual sensor read code
    return 25.0

sample_interval = 5  # seconds

while True:
    temp = read_temperature()
    print("Temperature:", temp)
    time.sleep(sample_interval)
```

Replace read_temperature() with your sensor-specific implementation (DS18B20/dht/ADC).

## Development

- Test interactively with Thonny for rapid iteration.
- Keep sensor initialization and read logic in separate modules for easier testing and swapping.

## Contributing

Contributions, issues and feature requests are welcome. When opening an issue or PR, please include:
- A clear description of the problem or feature
- Reproduction steps or code snippets
- Hardware and MicroPython firmware version used

## License

Choose and add a license (e.g., MIT, Apache-2.0). This repository does not include a license file by default—add LICENSE to declare terms.

## Contact

Open an issue in this repository for questions, suggestions, or bug reports.

Thanks for using pico_temp!
```
