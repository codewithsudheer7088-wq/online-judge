import sys

# first line = user code
# baaki = input
data = sys.stdin.read().split("###INPUT###")

code = data[0]
input_data = data[1] if len(data) > 1 else ""

# input ko simulate karna
sys.stdin = iter(input_data.split("\n"))

try:
    exec(code)
except Exception as e:
    print("Error:", e)