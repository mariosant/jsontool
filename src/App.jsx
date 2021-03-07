import React, { useState, useEffect } from 'react';
import { Editor } from '@app/components/Editor';

const App = () => {
  return (
    <div className="w-screen h-screen bg-gray-200 min-w-max">
      <div className="container grid grid-cols-3 gap-8 pt-24 mx-auto">
        <div className="col-span-1">
          <div className="mb-4 text-5xl">🧰</div>
          <h1 className="mb-2 text-3xl font-bold">JsonTool</h1>
          <p>An effective JSON toolbox with built-in jsonpath navigation.</p>
        </div>
        <div className="col-span-2">
          <Editor />
        </div>
      </div>
    </div>
  );
};

export default App;
