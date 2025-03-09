import Grab from "./index";

async function run() {
  const grab = new Grab();

  console.log("Grabbing from web...");
  const webResults = await grab.fetch("web", "AI breakthroughs 2025");
  console.log(webResults);

  console.log("Grabbing from X...");
  const xResults = await grab.fetch("x", "AI news");
  console.log(xResults);
}

run();