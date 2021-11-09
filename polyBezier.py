#!/usr/bin/python3
class Point:
	def __init__(self, name):
		self.name = name
		self.oneMinus = 0
		self.t = 0
		self.coefficient = 1

	def __repr__(self):
		# Makes output a little less cluttered by leaving out 1's, since they're implicit, and leaving out factors if they're ^0
		coefficient = "" if self.coefficient == 1 else self.coefficient
		t = "" if self.t == 0 else (f"t^{self.t}", "t")[self.t == 1]
		oneMinus = "" if self.oneMinus == 0 else (f"(1-t)^{self.oneMinus}", "(1-t)")[self.oneMinus == 1]
		
		return f"{coefficient}{t}{oneMinus}{self.name}"

def mult(point, factor):
	newPoint = Point(point.name)
	newPoint.coefficient = point.coefficient
	if(factor == "oneMinus"):
		newPoint.oneMinus = point.oneMinus + 1
		newPoint.t = point.t
	elif(factor == "t"):
		newPoint.oneMinus = point.oneMinus 
		newPoint.t = point.t + 1
	return newPoint


def add(p1, p2):
	p3 = Point(p1.name)
	p3.oneMinus = p1.oneMinus + p2.oneMinus
	p3.t = p1.t + p2.t
	p3.coefficient = p1.coefficient + p2.coefficient
	return p3

def arrAdd(arr, point):
	# print(arr)
	unadded = True
	for i in range(len(arr)):
		if(arr[i].name == point.name):
			if(arr[i].t == point.t and arr[i].oneMinus == point.oneMinus):
				arr[i].coefficient += point.coefficient
				unadded = False
	if(unadded):
		arr.append(point)
	return arr


if __name__ == "__main__":
	length = int(input())#"how many points? "))
	# print()
	points = []
	for i in range(length):
		points.append(Point(f"P{i}"))
	
	# print(points)
	last = list(map(lambda x : [x], points))
	# print(last)
	for i in range(length - 1):
		current = []
		# lerp level
		for j in range(len(last) - 1):
			# within a lerp
			current.append([])
			for elem in last[j]:
				# the 1-t portion
				current[j].append(mult(elem, "oneMinus"))
			for elem in last[j + 1]:
				current[j] = arrAdd(current[j], mult(elem, "t"))
		last = current
		# print(f"{i}:{last}")
	
	print(f"with {length} elements: ", end="")
	for elem in last[0]:
		print(elem, end=(" + ","\n")[elem.name == last[0][-1].name])

	
	
