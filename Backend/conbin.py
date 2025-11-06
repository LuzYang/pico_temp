import network
import urequests
import time
import machine

# Wi-Fi 信息
SSID = 'liangzhiyu'
PASSWORD = '123456789'

# 连接 Wi-Fi
wlan = network.WLAN(network.STA_IF)
wlan.active(True)
wlan.connect(SSID, PASSWORD)

while not wlan.isconnected():
    print('is connecting')
    time.sleep(1)

print('Wi-Fi connected')
print('IP address:', wlan.ifconfig())

# API 地址
api_url = 'http://172.20.10.5:3080/post_temp'

# 读取温度数据的函数
def read_temperature():
    sensor = machine.ADC(4)
    adc_value = sensor.read_u16()
    volt = (3.3 / 65535) * adc_value
    temperature = 27 - (volt - 0.706) / 0.001721
    return round(temperature, 2)

# 发送温度数据
while True:
    temperature = read_temperature()
    print(f'Sending temperature:{temperature}C')

    try:
        response = urequests.post(api_url, json={"temperature": temperature})
        print("Response:", response.text)
        response.close()
    except Exception as e:
        print("Failed to send data:", e)

    time.sleep(5)
