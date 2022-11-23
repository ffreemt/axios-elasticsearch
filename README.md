# axios-elasticsearch [![npm version](https://badge.fury.io/js/axios-elasticsearch.svg)](https://badge.fury.io/js/axios-elasticsearch)
search the elasticsearch database with default_operator="AND" and default_operator="OR" using axios for browser/vuejs

The elasticsearch node (a petite VPS) currently hosts some corpora (united nations en-zh corpus, examples sentences from some bilingual (en-zh) dictionaries and the European-Parliament German-English corpus). The elasticsearch node is open to the public for read-only access.

## Installation
`npm i axios-elasticsearch `

## Usage

```js
import axios_es from "axios-elasticsearch";

let query = "test测试";
axios_es(query, "uncor")
.then(res => console.log(res))
.catch(e => console.log(e.message))

```
will result in the following output
```bash
[
  '(g) Established policies and procedures for the testing of the plan, including <em>test</em> schedules, <em>test</em> objectives and <em>test</em> review procedures;→(g) 规定<em>测</em><em>试</em>计划
的政策和程序，包括<em>测</em><em>试</em>时间表、<em>测</em><em>试</em>目标及<em>测</em><em>试</em>审查
程序；',
  'The evaluation process includes an aptitude <em>test</em>, a physical <em>test</em> and an interview.→评价过程包括能力倾向<em>测</em><em>试</em>、体能<em>测</em><em>试</em>和面<em>试</em>。',
  'When mobile phones are to be tested the <em>test</em> should utilize at minimum an "air" or "ping" <em>test</em>, loop-back <em>test</em>, a screen and keypad <em>test</em>, and a battery <em>test</em> to determine to what extent they are suitable for reuse with or without repair, refurbishment or upgrading.→移动电话进行<em>测</em><em>试</em>时，该<em>测</em><em>试</em>应至少进行"空气"或"声脉冲"<em>测<
/em><em>试</em>、环回<em>测</em><em>试</em>、屏幕和键盘<em>测</em><em>试</em>，并进行电池<em>测</em><em>
试</em>以确定其在多大程度上不需修理、翻新或更新便适合再利用。',
  'These field tests should be completely documented, indicating the type of <em>test</em>, equipment utilized, <em>test</em> results and the name of the individual conducting the <em>test</em>.→这些实地<
em>测</em><em>试</em>应当全部作出文件记录，标明<em>测</em><em>试</em>类别所用设备，<em>测</em><em>试</
em>结果以及进行<em>测</em><em>试</em>者的姓名。',
  'When mobile phones are to be tested the <em>test</em> should utilize at minimum an "air" or "ping" <em>test</em>, loop-back <em>test</em>, a screen and keypad <em>test</em>, and a battery <em>test</em> to determine to what extent they are suitable for reuse with or without repair, refurbishment or upgrading.→移动电话进行<em>测</em><em>试</em>时，该<em>测</em><em>试</em>应至少进行"空气"或"声脉冲"<em>测<
/em><em>试</em>、环回<em>测</em><em>试</em>、屏幕和键盘<em>测</em><em>试</em>，并进行电池<em>测</em><em>
试</em>以确定其在多大程度上不需修理、翻新或更新便适合再利用。',
  '100 = Pressure <em>test</em> in kilo pacals (hydrostatic <em>test</em>);→对以公斤计算的货物进行拉力
<em>测</em><em>试</em>（静水压<em>测</em><em>试</em>）；',
  'Acceptance <em>Test</em> (Production Lot testing)→验收<em>测</em><em>试</em>(生产批次<em>测</em><em
>试</em>)',
  'BIT: Built in <em>test</em> [<em>test</em> integré]→BIT： 内置<em>测</em><em>试</em>',
  '(ii) Modified annex H <em>test</em> cases, <em>test</em> scripts and <em>test</em> manuals have been developed and evaluated in order to prepare for functional CSEUR tests;→为了准备对合并的欧洲登记册系
统进行功能<em>测</em><em>试</em>，已对附件H的<em>测</em><em>试</em>用例、<em>测</em><em>试</em>脚本和<e
m>测</em><em>试</em>手册进行调整和评估；',
  '<em>Test</em> Objective→<em>测</em><em>试</em>物',
   '(Search term(s): test测试, took 718 ms)'
]
```

---
This package has a single module: `search_es`

### search_es
`search_es`: searches a phrase or sentence in the elasticsearch node with a given index or indices and default_operator (default to "AND").

#### search_es with default_operatorv="OR"
If `search_es` with default_operator="AND" does not return any matched result, `search_es` with default_operator="OR" will attempt to suggest some closely matched result.

Since `search_es` with default_operator="OR" takes much longer than `search_es` with default_operator="AND" (especially when the phrace/sentence is long), use `search_es` with default_operator="AND" first. If `search_es` does not return anything, use `suggest_es` default_operator="OR".

Refer to `index.js`, `search_es.js` and files in the `test` directory.
