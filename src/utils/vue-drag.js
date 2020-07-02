/*
*Vue-drag.js v1.1.0
*By BosenY
*/
/* eslint-disable */
(function () {
	var vueDrag = {}
	vueDrag.install = function (Vue) {
		Vue.directive("drag", {
			bind: function (el, binding) {
				el.style.position = "absolute"
				var isChildDom
				if (binding.value !== undefined) {
					isChildDom = true
				} else {
					isChildDom = false
				}
				var offsetX = 0
				var offsetY = 0
				function down(e) {
					offsetX = (e.pageX - el.offsetLeft)
					offsetY = (e.pageY - el.offsetTop)
					if (isChildDom) {
						var childdom = el.querySelector(binding.value)
						childdom.style.position = "relative"

						if(binding.modifiers.cursor) childdom.style.cursor = "move"
						var barStyle = childdom.currentStyle
							? childdom.currentStyle
							: window.getComputedStyle(childdom, null)
						var boxStyle = el.currentStyle
							? el.currentStyle
							: window.getComputedStyle(el, null)
						var left = Number(barStyle.getPropertyValue("left").replace("px", "")) + Number(boxStyle.getPropertyValue("left").replace("px", "")) + Number(boxStyle.getPropertyValue("border-left-width").replace("px", ""))
						var right = left + Number(barStyle.getPropertyValue("width").replace("px", ""))
						var top = Number(barStyle.getPropertyValue("top").replace("px", "")) + Number(boxStyle.getPropertyValue("top").replace("px", "")) + Number(boxStyle.getPropertyValue("border-top-width").replace("px", ""))
						var bottom = top + Number(barStyle.getPropertyValue("height").replace("px", ""))
						if (e.clientX <= right && e.clientX >= left && e.clientY >= top && e.clientY <= bottom) {
							addEventListener("mousemove", move)
							addEventListener("mouseup", up)
						}
					} else {
						if(binding.modifiers.cursor) el.style.cursor = "move"
						addEventListener("mousemove", move)
						addEventListener("mouseup", up)
					}
				}
				function move(e) {
					el.style.left = (e.pageX - offsetX) + "px"
					el.style.top = (e.pageY - offsetY) + "px"
				}
				function up() {
					removeEventListener("mousemove", move)
					removeEventListener("mouseup", up)
				}
				el.addEventListener("mousedown", down)
			}
		})
	}
	if (typeof exports == "object") {
		module.exports = vueDrag
	} else if (typeof define == "function" && define.amd) {
		define([], function () {
			return vueDrag
		})
	} else if (window.Vue) {
		window.vueDrag = vueDrag
		Vue.use(vueDrag)
	}
})()
