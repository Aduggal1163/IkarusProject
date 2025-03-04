// import React, { useState, useEffect } from "react";
// import { saveConfiguration, getConfigurations } from "../utils/firebaseActions";

// const SolarSystem = () => {
//   const [config, setConfig] = useState({
//     planetSize: 1,
//     orbitSpeed: 1,
//     distanceFromSun: 100,
//   });

//   // Save current configuration
//   const handleSave = async () => {
//     await saveConfiguration(config);
//     alert("Configuration saved!");
//   };

//   // Load configurations
//   const handleLoad = async () => {
//     const configs = await getConfigurations();
//     console.log(configs);
//     if (configs.length > 0) {
//       setConfig(configs[0]); // Just loading the first config as an example
//     }
//   };

//   return (
//     <div>
//       <button onClick={handleSave}>Save Configuration</button>
//       <button onClick={handleLoad}>Load Configuration</button>
//     </div>
//   );
// };

// export default SolarSystem;

import { saveConfiguration, getConfigurations } from "../utils/firebaseActions";

const SolarSystem = ({ currentConfig }) => {
  const handleSave = async () => {
    await saveConfiguration(currentConfig);
  };

  const handleLoad = async () => {
    const configs = await getConfigurations();
    if (configs.length > 0) {
      console.log("Loading config:", configs[0]); // Example: Load the first config
      // Apply config to your 3D solar system here
    } else {
      console.log("No configurations found");
    }
  };

  return (
    <div>
      <button onClick={handleSave}>Save Configuration</button>
      <button onClick={handleLoad}>Load Configuration</button>
    </div>
  );
};

export default SolarSystem;
