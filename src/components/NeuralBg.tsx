// import { useEffect, useRef } from "react";

// class Particle {
//   x: number;
//   y: number;
//   vx: number;
//   vy: number;

//   constructor(width: number, height: number) {
//     this.x = Math.random() * width;
//     this.y = Math.random() * height;
//     this.vx = (Math.random() - 0.5) * 0.4;
//     this.vy = (Math.random() - 0.5) * 0.4;
//   }

//   update(
//     width: number,
//     height: number,
//     mouse: { x: number; y: number }
//   ) {
//     // base motion
//     this.x += this.vx;
//     this.y += this.vy;

//     // cursor attraction - REDUCED STRENGTH
//     const dx = mouse.x - this.x;
//     const dy = mouse.y - this.y;
//     const dist = Math.sqrt(dx * dx + dy * dy);

//     const attractionRadius = 200; // Increased radius for more gradual effect

//     if (dist < attractionRadius) {
//       // Gentle falloff - using a squared falloff for smoother effect
//       const normalizedDist = dist / attractionRadius;
//       const force = (1 - normalizedDist * normalizedDist); // Quadratic falloff
      
//       // Reduced attraction strength from 0.02 to 0.006
//       this.x += dx * force * 0.0020;
//       this.y += dy * force * 0.0020;
//     }

//     // bounds bounce
//     if (this.x < 0 || this.x > width) this.vx *= -1;
//     if (this.y < 0 || this.y > height) this.vy *= -1;
//   }

//   draw(
//     ctx: CanvasRenderingContext2D,
//     mouse: { x: number; y: number }
//   ) {
//     const dx = mouse.x - this.x;
//     const dy = mouse.y - this.y;
//     const dist = Math.sqrt(dx * dx + dy * dy);

//     const glowRadius = 120;

//     const isGlowing = dist < glowRadius;

//     ctx.beginPath();
//     ctx.arc(this.x, this.y, isGlowing ? 2.4 : 1.5, 0, Math.PI * 2);

//     if (isGlowing) {
//       ctx.fillStyle = "rgba(239,68,68,0.9)"; // red-500
//       ctx.shadowColor = "rgba(239,68,68,0.9)";
//       ctx.shadowBlur = 12;
//     } else {
//       ctx.fillStyle = "rgba(0,0,0,0.35)";
//       ctx.shadowBlur = 0;
//     }

//     ctx.fill();
//   }
// }

// export default function NeuralBackground() {
//   const canvasRef = useRef<HTMLCanvasElement | null>(null);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     const ctx = canvas.getContext("2d");
//     if (!ctx) return;

//     let width = window.innerWidth;
//     let height = window.innerHeight;

//     const particleCount = 70;
//     // let scrollOffset = 0;
//     let animationId: number;

//     const mouse = { x: -9999, y: -9999 };

//     const resize = () => {
//       width = canvas.width = window.innerWidth;
//       height = canvas.height = window.innerHeight;
//     };

//     resize();

//     const particles: Particle[] = Array.from(
//       { length: particleCount },
//       () => new Particle(width, height)
//     );

//     // const onScroll = () => {
//     //   scrollOffset = window.scrollY * 0.002;
//     // };

//     const onMouseMove = (e: MouseEvent) => {
//       mouse.x = e.clientX;
//       mouse.y = e.clientY;
//     };

//     const onMouseLeave = () => {
//       mouse.x = -9999;
//       mouse.y = -9999;
//     };

//     const connect = () => {
//       for (let i = 0; i < particles.length; i++) {
//         for (let j = i + 1; j < particles.length; j++) {
//           const dx = particles[i].x - particles[j].x;
//           const dy = particles[i].y - particles[j].y;
//           const dist = Math.sqrt(dx * dx + dy * dy);

//           if (dist < 120) {
//             // highlight if near mouse
//             const midX = (particles[i].x + particles[j].x) / 2;
//             const midY = (particles[i].y + particles[j].y) / 2;

//             const mdx = mouse.x - midX;
//             const mdy = mouse.y - midY;
//             const mdist = Math.sqrt(mdx * mdx + mdy * mdy);

//             const highlight = mdist < 140;

//             ctx.strokeStyle = highlight
//               ? `rgba(239,68,68,${1 - dist / 120})`
//               : `rgba(0,0,0,${1 - dist / 120})`;

//             ctx.lineWidth = highlight ? 0.8 : 0.3;

//             if (highlight) {
//               ctx.shadowColor = "rgba(239,68,68,0.8)";
//               ctx.shadowBlur = 10;
//             } else {
//               ctx.shadowBlur = 0;
//             }

//             ctx.beginPath();
//             ctx.moveTo(particles[i].x, particles[i].y);
//             ctx.lineTo(particles[j].x, particles[j].y);
//             ctx.stroke();
//           }
//         }
//       }
//     };

//     const animate = () => {
//       ctx.clearRect(0, 0, width, height);

//       particles.forEach((p) => {
//         p.update(width, height, mouse);
//         p.draw(ctx, mouse);
//       });

//       connect();

//       animationId = requestAnimationFrame(animate);
//     };

//     animate();

//     window.addEventListener("resize", resize);
//     // window.addEventListener("scroll", onScroll);
//     window.addEventListener("mousemove", onMouseMove);
//     window.addEventListener("mouseleave", onMouseLeave);

//     return () => {
//       cancelAnimationFrame(animationId);
//       window.removeEventListener("resize", resize);
//       // window.removeEventListener("scroll", onScroll);
//       window.removeEventListener("mousemove", onMouseMove);
//       window.removeEventListener("mouseleave", onMouseLeave);
//     };
//   }, []);

//   return (
//     <canvas
//       ref={canvasRef}
//       className="fixed inset-0 -z-10 pointer-events-none"
//     />
//   );
// }

import { useEffect, useRef } from "react";

class Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;

  constructor(width: number, height: number) {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.vx = (Math.random() - 0.5) * 0.4;
    this.vy = (Math.random() - 0.5) * 0.4;
  }

  update(
    width: number,
    height: number,
    mouse: { x: number; y: number }
  ) {
    // base motion
    this.x += this.vx;
    this.y += this.vy;

    // TRÈS LÉGÈRE attraction du curseur
    const dx = mouse.x - this.x;
    const dy = mouse.y - this.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    const attractionRadius = 150; // Rayon modéré

    if (dist < attractionRadius) {
      // Force très faible et progressive
      const force = 0.3 * (1 - dist / attractionRadius); // Facteur réduit à 0.3
      
      // Perturbation subtile, pas une attraction directe
      this.x += (Math.random() - 0.5) * force * 0.5;
      this.y += (Math.random() - 0.5) * force * 0.5;
      
      // Très légère tendance vers la souris (optionnel)
      // this.x += dx * 0.0005;
      // this.y += dy * 0.0005;
    }

    // bounds bounce
    if (this.x < 0 || this.x > width) this.vx *= -1;
    if (this.y < 0 || this.y > height) this.vy *= -1;
  }

  draw(
    ctx: CanvasRenderingContext2D,
    mouse: { x: number; y: number }
  ) {
    const dx = mouse.x - this.x;
    const dy = mouse.y - this.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    const glowRadius = 120;

    const isGlowing = dist < glowRadius;

    ctx.beginPath();
    ctx.arc(this.x, this.y, isGlowing ? 2.4 : 1.5, 0, Math.PI * 2);

    if (isGlowing) {
      ctx.fillStyle = "rgba(239,68,68,0.9)"; // red-500
      ctx.shadowColor = "rgba(239,68,68,0.9)";
      ctx.shadowBlur = 12;
    } else {
      ctx.fillStyle = "rgba(0,0,0,0.35)";
      ctx.shadowBlur = 0;
    }

    ctx.fill();
  }
}

export default function NeuralBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    const particleCount = 70;
    let animationId: number;

    const mouse = { x: -9999, y: -9999 };

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    resize();

    const particles: Particle[] = Array.from(
      { length: particleCount },
      () => new Particle(width, height)
    );

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const onMouseLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    const connect = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            // highlight if near mouse
            const midX = (particles[i].x + particles[j].x) / 2;
            const midY = (particles[i].y + particles[j].y) / 2;

            const mdx = mouse.x - midX;
            const mdy = mouse.y - midY;
            const mdist = Math.sqrt(mdx * mdx + mdy * mdy);

            const highlight = mdist < 140;

            ctx.strokeStyle = highlight
              ? `rgba(239,68,68,${1 - dist / 120})`
              : `rgba(0,0,0,${1 - dist / 120})`;

            ctx.lineWidth = highlight ? 0.8 : 0.3;

            if (highlight) {
              ctx.shadowColor = "rgba(239,68,68,0.8)";
              ctx.shadowBlur = 10;
            } else {
              ctx.shadowBlur = 0;
            }

            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.update(width, height, mouse);
        p.draw(ctx, mouse);
      });

      connect();

      animationId = requestAnimationFrame(animate);
    };

    animate();

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseleave", onMouseLeave);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none"
    />
  );
}