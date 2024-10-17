// src/Dashboard/graph/GraphAnimation.js
import React from 'react';

const GraphAnimation = ({ data }) => {
  return (
    <div>
      <h4>Animation Component</h4>
      {/* Add your animation logic here based on the data received */}
      <p>{JSON.stringify(data, null, 2)}</p>
    </div>
  );
};

export default GraphAnimation;
