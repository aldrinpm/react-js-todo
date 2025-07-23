import React from "react";

export const lazyWithDelay = (importFunc: () => Promise<any>, delay: number = 1000) => {
  return React.lazy(() =>
    Promise.all([
      importFunc(),
      new Promise(resolve => setTimeout(resolve, delay)), // Delay
    ]).then(([moduleExports]) => moduleExports)
  );
};
