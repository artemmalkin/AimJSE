const Gmath = new Module('Gmath');

Gmath.clamp = (x, min, max) => Math.min(Math.max(x, min), max);

Gmath.distance = (x1, y1, x2, y2) => Math.sqrt(((y2 - y1) ** 2) + ((x2 - x1) ** 2));
