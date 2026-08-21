const fs = require("fs");
const path = require("path");
const { pathToFileURL } = require("url");

// ============================================================
// PATHS
// ============================================================

const ROOT = __dirname;

const PERSONA_DB = path.join(
  ROOT,
  "Frontend",
  "src",
  "data",
  "personaDB.js"
);

const IMAGE_ROOT = path.join(
  ROOT,
  "Frontend",
  "public",
  "images",
  "Persona Artwork"
);

const OUTPUT_FILE = path.join(
  ROOT,
  "Frontend",
  "src",
  "data",
  "personaImages.js"
);

// ============================================================
// START
// ============================================================

console.log(
  "Persona Image Manifest Generator"
);

console.log(
  "================================="
);

console.log("");

console.log(
  "Persona database:"
);

console.log(
  PERSONA_DB
);

console.log("");

console.log(
  "Artwork directory:"
);

console.log(
  IMAGE_ROOT
);

console.log("");

// ============================================================
// CHECK FILES
// ============================================================

if (!fs.existsSync(PERSONA_DB)) {
  console.error(
    "ERROR: personaDB.js was not found."
  );

  console.error(
    `Expected:\n${PERSONA_DB}`
  );

  process.exit(1);
}

if (!fs.existsSync(IMAGE_ROOT)) {
  console.error(
    "ERROR: Persona Artwork directory was not found."
  );

  console.error(
    `Expected:\n${IMAGE_ROOT}`
  );

  process.exit(1);
}

// ============================================================
// NORMALIZE TEXT
// ============================================================

function normalize(value) {
  return String(value)
    .toLowerCase()
    .replace(
      /\.(png|webp|jpg|jpeg)$/i,
      ""
    )
    .replace(
      /[_\-–—]+/g,
      " "
    )
    .replace(
      /[^a-z0-9\s]/g,
      ""
    )
    .replace(
      /\s+/g,
      " "
    )
    .trim();
}

// ============================================================
// GET ALL IMAGE FILES
// ============================================================

function getAllFiles(directory) {
  const files = [];

  const entries = fs.readdirSync(
    directory,
    {
      withFileTypes: true,
    }
  );

  for (const entry of entries) {
    const fullPath =
      path.join(
        directory,
        entry.name
      );

    if (entry.isDirectory()) {
      files.push(
        ...getAllFiles(fullPath)
      );
    } else {
      files.push(fullPath);
    }
  }

  return files;
}

const imageFiles =
  getAllFiles(IMAGE_ROOT).filter(
    (file) =>
      /\.(png|webp|jpg|jpeg)$/i.test(
        file
      )
  );

console.log(
  `Found ${imageFiles.length} artwork files.`
);

console.log("");

// ============================================================
// BUILD IMAGE INDEX
// ============================================================

const imageIndex = new Map();

for (const file of imageFiles) {
  const filename =
    path.basename(file);

  const relative =
    path.relative(
      path.join(
        ROOT,
        "Frontend",
        "public"
      ),
      file
    );

  const publicPath =
    "/" +
    relative
      .split(path.sep)
      .join("/");

  imageIndex.set(
    normalize(filename),
    publicPath
  );
}

// ============================================================
// ALSO BUILD A SIMPLIFIED IMAGE INDEX
// ============================================================
//
// Helps match things like:
//
// "Caesar - Persona 3 Art"
//
// against:
//
// "Caesar.jpg"
//
// when appropriate.
// ============================================================

const simplifiedImageIndex =
  new Map();

for (const [
  normalizedName,
  imagePath,
] of imageIndex.entries()) {
  const simplified =
    normalizedName
      .replace(
        /\bpersona\b/g,
        ""
      )
      .replace(
        /\bartwork\b/g,
        ""
      )
      .replace(
        /\bart\b/g,
        ""
      )
      .replace(
        /\bportrait\b/g,
        ""
      )
      .replace(
        /\bclassic\b/g,
        ""
      )
      .replace(
        /\boriginal\b/g,
        ""
      )
      .replace(
        /\s+/g,
        " "
      )
      .trim();

  if (
    simplified &&
    !simplifiedImageIndex.has(
      simplified
    )
  ) {
    simplifiedImageIndex.set(
      simplified,
      imagePath
    );
  }
}

// ============================================================
// IMPORT THE ACTUAL PERSONA DATABASE
// ============================================================

async function loadPersonaDatabase() {
  /*
   * personaDB.js is an ES module because Frontend/package.json
   * contains "type": "module".
   *
   * Dynamic import lets this CommonJS script load it correctly.
   */

  const modulePath =
    pathToFileURL(
      PERSONA_DB
    ).href;

  const module =
    await import(
      `${modulePath}?cacheBust=${Date.now()}`
    );

  if (
    !Array.isArray(
      module.personaDB
    )
  ) {
    throw new Error(
      "personaDB.js does not export personaDB as an array."
    );
  }

  return module.personaDB;
}

// ============================================================
// FIND IMAGE FOR PERSONA
// ============================================================

function findPersonaImage(
  persona
) {
  const possibleNames = [];

  // ----------------------------------------------------------
  // 1. images[] values
  // ----------------------------------------------------------

  if (
    Array.isArray(
      persona.images
    )
  ) {
    possibleNames.push(
      ...persona.images
    );
  }

  // ----------------------------------------------------------
  // 2. Persona name
  // ----------------------------------------------------------

  if (persona.name) {
    possibleNames.push(
      persona.name
    );
  }

  // ----------------------------------------------------------
  // 3. Persona ID
  // ----------------------------------------------------------

  if (persona.id) {
    possibleNames.push(
      persona.id
    );
  }

  // ----------------------------------------------------------
  // EXACT MATCH
  // ----------------------------------------------------------

  for (const name of possibleNames) {
    const normalized =
      normalize(name);

    if (
      imageIndex.has(
        normalized
      )
    ) {
      return imageIndex.get(
        normalized
      );
    }
  }

  // ----------------------------------------------------------
  // SIMPLIFIED MATCH
  // ----------------------------------------------------------

  for (const name of possibleNames) {
    const normalized =
      normalize(name);

    const simplified =
      normalized
        .replace(
          /\bpersona\b/g,
          ""
        )
        .replace(
          /\bartwork\b/g,
          ""
        )
        .replace(
          /\bart\b/g,
          ""
        )
        .replace(
          /\bportrait\b/g,
          ""
        )
        .replace(
          /\bclassic\b/g,
          ""
        )
        .replace(
          /\boriginal\b/g,
          ""
        )
        .replace(
          /\s+/g,
          " "
        )
        .trim();

    if (
      simplifiedImageIndex.has(
        simplified
      )
    ) {
      return simplifiedImageIndex.get(
        simplified
      );
    }
  }

  // ----------------------------------------------------------
  // NO MATCH
  // ----------------------------------------------------------

  return null;
}

// ============================================================
// GENERATE MANIFEST
// ============================================================

async function main() {
  console.log(
    "Loading Persona database..."
  );

  const personaDB =
    await loadPersonaDatabase();

  console.log(
    `Found ${personaDB.length} Personas in personaDB.js.`
  );

  console.log("");

  const manifest = {};

  const unmatched = [];

  // ==========================================================
  // MATCH EVERY PERSONA
  // ==========================================================

  for (const persona of personaDB) {
    const imagePath =
      findPersonaImage(
        persona
      );

    /*
     * IMPORTANT:
     *
     * Every Persona gets an entry.
     *
     * Even unmatched Personas get null.
     */
    manifest[
      persona.id
    ] = imagePath;

    if (!imagePath) {
      unmatched.push(
        persona
      );
    }
  }

  // ==========================================================
  // GENERATE FILE CONTENT
  // ==========================================================

  const lines = [];

  lines.push(
    "// ============================================================"
  );

  lines.push(
    "// AUTO-GENERATED FILE"
  );

  lines.push(
    "// DO NOT EDIT MANUALLY"
  );

  lines.push(
    "//"
  );

  lines.push(
    "// Generated by generatePersonaImages.cjs"
  );

  lines.push(
    "// ============================================================"
  );

  lines.push("");

  lines.push(
    "export const PERSONA_IMAGES = {"
  );

  const sortedIds =
    Object.keys(manifest).sort();

  for (
    const id of sortedIds
  ) {
    lines.push(
      `  ${JSON.stringify(
        id
      )}: ${JSON.stringify(
        manifest[id]
      )},`
    );
  }

  lines.push("};");

  lines.push("");

  // ==========================================================
  // WRITE FILE
  // ==========================================================

  fs.writeFileSync(
    OUTPUT_FILE,
    lines.join("\n"),
    "utf8"
  );

  // ==========================================================
  // REPORT
  // ==========================================================

  const matchedCount =
    personaDB.length -
    unmatched.length;

  console.log(
    "================================="
  );

  console.log(
    "Manifest generated successfully."
  );

  console.log("");

  console.log(
    `Personas in database: ${personaDB.length}`
  );

  console.log(
    `Personas matched:      ${matchedCount}`
  );

  console.log(
    `Personas unmatched:    ${unmatched.length}`
  );

  console.log("");

  console.log(
    `Output: ${OUTPUT_FILE}`
  );

  console.log("");

  // ==========================================================
  // UNMATCHED PERSONAS
  // ==========================================================

  if (
    unmatched.length > 0
  ) {
    console.log(
      "UNMATCHED PERSONAS"
    );

    console.log(
      "=================="
    );

    unmatched.forEach(
      (persona) => {
        console.log(
          `\n${persona.name}`
        );

        console.log(
          `ID: ${persona.id}`
        );

        console.log(
          `Game: ${persona.originGame}`
        );

        console.log(
          `Images: ${
            Array.isArray(
              persona.images
            )
              ? persona.images.join(
                  ", "
                )
              : "none"
          }`
        );
      }
    );

    console.log("");
  } else {
    console.log(
      "Every Persona has a matching image."
    );
  }

  console.log("");
  console.log("Done.");
}

// ============================================================
// RUN
// ============================================================

main().catch((error) => {
  console.error("");
  console.error(
    "Image manifest generation failed:"
  );

  console.error(error);

  process.exit(1);
});