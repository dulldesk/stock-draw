const rand = (mn,mx) => Math.random() * (mx-mn) + mn;
const shade = () => rand(160,230);
var w,h;
var canvas_count = 0;
const $ = i => document.querySelector(i);

function updateCanvasNodes() {
	const new_cnt = $("#n").value;
	const tmpl = $("template").content;

	for (; canvas_count > new_cnt; canvas_count--) {
		$("#nodes").querySelectorAll("canvas")[canvas_count - 1].parentElement.remove();
	}
	for (; canvas_count < new_cnt; canvas_count++) {
		let node = tmpl.cloneNode(true);
		node.querySelector("canvas").id += canvas_count;
		$("#nodes").appendChild(node);
	}
}
function generateAll() {
	updateCanvasNodes();
	w = $("#w").value;
	h = $("#h").value;
	for (let c of $("#nodes").querySelectorAll("canvas")) {
		c.width = w;
		c.height = h;
		draw(c);
		$(`#${c.id} + * a[download]`).href = c.toDataURL("image/png");
	}
}

function drawCircle(ctx) {
	let x = rand(10, w-10);
	let y = rand(10, h-10);
	let rx = rand(100,300);
	let ry = rand(0.5,1.5) * rx;

	ctx.fillStyle = `rgba(${shade()},${shade()},${shade()},0.35)`;
	ctx.beginPath();
	ctx.ellipse(x, y, rx, ry, Math.PI / 4, 0, 2 * Math.PI)
	ctx.fill();
}

function draw(cvs) {
	const ctx = cvs.getContext('2d');

	ctx.fillStyle = "white";
	ctx.beginPath();
	ctx.fillRect(0,0,w,h);
	ctx.fill();

	ctx.strokeStyle = "transparent";
	drawCircle(ctx);
	drawCircle(ctx);
	drawCircle(ctx);
}

window.onload = () => {
	["w","h"].forEach(i => {
		let foo = _ => $(`#${i}-val`).textContent = $(`#${i}`).value;
		$(`#${i}`).addEventListener("input", foo);
		foo();
	});
	generateAll();
};
function downloadAll() {
	document.querySelectorAll("a[download]").forEach(i => i.click());
}
