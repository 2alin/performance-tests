/***************
  Data To Test
****************/

const str =
  "Proin lacinia interdum tellus, sit amet commodo velit feugiat eget. Proin nec diam tellus. Suspendisse fringilla sapien tristique mi dignissim, vitae luctus ex laoreet. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nullam viverra aliquam velit, ut iaculis ante viverra id. Find me! I'm blue. Pellentesque id elementum eros. Nunc dui augue, convallis ac dui nec, gravida gravida ligula. In tristique maximus ex at dapibus.";

const blue = 'blue';
const blueRegEx = /blue/;

/*****************
  Methods To Test
******************/

function checkByMatch() {
  str.match(blueRegEx);
}

function checkByTest() {
  blueRegEx.test(str);
}

function checkByIndexOf() {
  str.indexOf(blue);
}

function checkByIncludes() {
  str.includes(blue);
}

/****************
  Analysis Tools
*****************/

const expIterations = 100000;

function experiment(fn) {
  const start = Date.now();
  for (let i = 1; i < expIterations; i++) {
    fn();
  }
  const res = Date.now() - start;
  return res;
}

function calcMean(arr) {
  return arr.reduce((a, b) => a + b, 0) / arr.length;
}

function analysis(fn, title) {
  console.log(`> Running '${title} experiment'`);
  const values = [];
  for (let k = 0; k < 10; k++) {
    values.push(experiment(fn));
  }

  const mean = calcMean(values);

  console.log(`::: ${title} ::::`);
  console.log('Values: ', values);
  console.log('Min: ', Math.min(...values));
  console.log('Max: ', Math.max(...values));
  console.log('Mean: ', mean);
  console.log('* all units are in milliseconds\n');
  return mean;
}

document.querySelector('button').addEventListener('click', () => {
  /***************
    Running Tests
  ****************/

  const tests = [
    [checkByMatch, 'match() [String]'],
    [checkByTest, 'test() [RegExp]'],
    [checkByIndexOf, 'indexOf() [String]'],
    [checkByIncludes, 'includes() [String]']
  ];

  const results = tests.map(test => analysis(test[0], test[1]));

  /********************
    Displaying results
  *********************/
  const fragment = document.createDocumentFragment();
  const resultsContainer = document.querySelector('.results');

  console.log('> Results');

  for (let k = 0; k < tests.length; k++) {
    const descriptionText = `${tests[k][1]}:`;
    const valueText = `${results[k]} ms`;
    console.log(descriptionText + ' ' + valueText);
    const p = document.createElement('p');
    const description = document.createElement('span');
    const value = document.createElement('span');
    description.innerHTML = descriptionText;
    value.innerHTML = valueText;
    p.appendChild(description);
    p.appendChild(value);
    fragment.appendChild(p);
  }
  resultsContainer.innerHTML = '';
  resultsContainer.appendChild(fragment);
});
