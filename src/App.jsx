import React from 'react';
import { Editor } from '@app/components/Editor';
import { FeedbackFish } from '@feedback-fish/react';

const feedbackFishId = import.meta.env.SNOWPACK_PUBLIC_FEEDBACK_FISH_ID;

const App = () => {
  return (
    <div className="w-screen min-h-screen bg-gray-200 min-w-max">
      <div className="container grid grid-cols-3 gap-8 pt-24 mx-auto">
        <div className="col-span-1">
          <div className="mb-4 text-4xl">🧰</div>
          <div className="prose ">
            <h1>JsonTool</h1>
            <p>
              An effective 💪 JSON toolbox with built-in jsonpath navigation.
            </p>
            <p>
              Developed by{' '}
              <a
                href="https://mariosant.dev"
                target="_blank"
                rel="noopener noreferrer"
              >
                mariosant
              </a>
              <br />
              Source at{' '}
              <a
                href="https://github.com/mariosant/jsontool"
                target="_blank"
                rel="noopener noreferrer"
              >
                Github
              </a>{' '}
              <br />
            </p>
            <FeedbackFish projectId={feedbackFishId}>
              <a className="block underline cursor-pointer">Feedback?</a>
            </FeedbackFish>
            <a
              className="block"
              href="https://goessner.net/articles/JsonPath/index.html#e2"
              target="_blank"
              rel="noopener noreferrer"
            >
              jsonpath reference
            </a>
          </div>
        </div>
        <div className="col-span-2">
          <Editor />
        </div>
      </div>
    </div>
  );
};

export default App;
