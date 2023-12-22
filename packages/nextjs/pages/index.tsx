import { useEffect, useState } from "react";
import { NextPage } from "next";
import { type } from "os";
import ReactMarkdown from "react-markdown";

//定义一个新的数据类型来记录后端返回的数据
export type resultByDataset = {
  dataset_id: string;
  results: search_result[];
};
//定义一个数据类型来记录每个搜索结果
export type search_result = {
  id: string;
  data: string;
  metadata: {};
};

const ETHSpace: NextPage = () => {
  //在对后端发起请求后，将response的内容保存在results中
  //如果用户选择使用mixed模式，则使用resultByDataset来记录结果
  const [res, setRes] = useState<resultByDataset[]>([]);
  //设置默认是在我们提供的数据集而不是公共数据集中查询
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [datasetList, _setDatasetList] = useState(false);
  //获取目前提供的数据集选项
  const [options, setOptions] = useState<string[]>([]);
  const [itemId, setItemId] = useState<number>();
  //获取用户选择的数据集
  const [dataset, setDataset] = useState("mixed");
  //获取用户搜索的prompt
  const [searchPrompt, setSearchPrompt] = useState("");
  //仅在组件挂载时执行一次获取数据集列表
  useEffect(() => {
    fetchOptions();
    // console.log(data);
  });

  //从后端获取数据集列表
  const fetchOptions = async () => {
    // const response = await fetch("https://faas.movespace.xyz/api/v1/run?name=VectorAPI&func_name=get_cluster", {
    //   method: "POST",
    //   headers:{
    //     'Content-Type':'application/json;charset=utf-8',
    //   },
    //   body:JSON.stringify({
    //     "params": ["ai-based-smart-contract-explorer"]
    //   })
    // });
    // const data=await response.json();
    setOptions(["bodhi-text-contents"]);
  };
  //获取search prompt与dataset名字后向后端发request
  const handleonClick = async () => {
    //每次查询前要先把res重置为空
    setRes([]);
    // 1. request a search item at deno.
    // 2. wait for 1.5 sec to query the result.
    // 3. return as a list.
    await fetch("https://embedding-search.deno.dev/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: "leeduckgogogo",
      }),
    })
      .then(response => response.json())
      .then(data => {
        // handle data
        setItemId(data.item_id);
        console.log("item id: " + itemId);
      });

    const response = await fetch("https://faas.movespace.xyz/api/v1/run?name=VectorAPI&func_name=search_data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({
        params: [dataset, searchPrompt, 5],
      }),
    });
    const data = await response.json();
    const res1: resultByDataset = {
      dataset_id: data.result.dataset_id,
      results: data.result.similarities.map((s: { data: any; metadata: any }) => {
        return {
          data: s.data,
          metadata: s.metadata,
        };
      }),
    };
    // console.log(data.result.similarities);
    setRes(res => [res1, ...res]);
    // console.log(res);
  };
  return (
    <div className="grid lg:grid-cols-2 flex-grow">
      <div className="hero min-h-screen bg-base-200 bg-gradient-to-r from-green-500 to-blue-500">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-2xl font-bold">🔎🤠 Bodhi AI Explorer</h1>
            <p className="py-6">-- Content Search & Tagger App based on AI </p>
            <div className="join mb-6">
              <div>
                <div>
                  <input
                    style={{ width: "300px" }}
                    className="input input-bordered join-item"
                    value={searchPrompt}
                    onChange={e => {
                      setSearchPrompt(e.target.value);
                    }}
                    placeholder="Enter your prompt to search"
                  />
                </div>
              </div>
              <div>
                <div>
                  {!datasetList ? (
                    <select
                      className="select select-bordered join-item"
                      onChange={e => {
                        setDataset(e.target.value);
                      }}
                    >
                      {options.map((option, index) => (
                        <option key={index} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      className="input input-bordered join-item"
                      value={dataset}
                      onChange={e => {
                        setDataset(e.target.value);
                      }}
                      placeholder="Pls input the public dataset name"
                    />
                  )}
                </div>
              </div>
              <div className="indicator">
                <button
                  className="btn join-item"
                  onClick={() => {
                    handleonClick();
                  }}
                >
                  🔎 Search
                </button>
              </div>
            </div>
            <div className="hero-content text-left">
              <span className="text-sm">
                <p>
                  <b>Some search question examples: </b>
                </p>
                <p>* bitcoin</p>
                <p>* bodhi</p>
              </span>
            </div>
            <a href="https://bodhi.wtf/10586" target="_blank" rel="noreferrer">
              <button className="w-96 bg-white hover:bg-gray-100 text-gray-800 py-2 px-5 border border-gray-400 rounded shadow">
                🤑 <b>Buy</b> shares to support explorer!
              </button>
            </a>
            <br></br>
            <a
              href="https://bodhi.wtf/address/0x73c7448760517E3E6e416b2c130E3c6dB2026A1d"
              target="_blank"
              rel="noreferrer"
            >
              <button className="w-96 bg-white hover:bg-gray-100 text-gray-800 py-2 px-5 border border-gray-400 rounded shadow">
                📝 Blog for Explorer<b>(See the future plan)</b>
              </button>
            </a>
            <br></br>
            <a href="https://explorer.movespace.xyz" target="_blank" rel="noreferrer">
            <button className="w-96 bg-white hover:bg-gray-100 text-gray-800 py-2 px-5 border border-gray-400 rounded shadow">
              <b>🛝 Go to MoveSpace Explorer</b>
            </button>
            </a>
            <br></br>
            <button className="w-96 bg-white hover:bg-gray-100 text-gray-800 py-2 px-5 border border-gray-400 rounded shadow">
              👽 A Random <b>Indie Hacker</b>
            </button>
            <br></br>
            <a href="https://twitter.com/0xleeduckgo" target="_blank" rel="noreferrer">
              <button className="w-96 bg-white hover:bg-gray-100 text-gray-800 py-2 px-5 border border-gray-400 rounded shadow">
                ❤️ Follow my twitter! ❤️
              </button>
            </a>
          </div>
        </div>
      </div>
      <div className="bg-gradient-to-r from-blue-500 to-green-500">
        <div className="mx-auto w-4/5 max-h-[600px] backdrop-blur-lg backdrop-filter p-10 m-10 rounded-lg opacity-80 shadow-md overflow-auto overflow-y-auto">
          <h2 className="text-4xl font-bold mb-1">Search Results</h2>
          <div>
            {res.map((r, index) => (
              <div key={index} className="collapse bg-base-200 m-5 overflow-x-auto">
                <input type="checkbox" className="peer" />
                <div className="collapse-title bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
                  Results from {r.dataset_id}
                </div>
                <div className="collapse-content bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
                  {r.results.map((item, index) => (
                    <div key={index}>
                      <div className="divider"></div>
                      <span className="text-xl">Data</span>
                      <div>
                        <ReactMarkdown>{item.data}</ReactMarkdown>
                      </div>
                      <span className="text-xl">Metadata</span>
                      <pre className="text-base"><b>Creator:</b> {item.metadata.creator}</pre>
                      <pre className="text-base"><b>Bodhi ID(view the full content in Bodhi): </b> 
                      <a href={"https://bodhi.wtf/" + item.metadata.id} target="_blank" rel="noreferrer">
                        <button
                          className="btn join-item"
                        >
                          {item.metadata.id}
                        </button>
                      </a>
                      </pre>
                      <pre className="text-base"><b>Type: </b>{item.metadata.type}</pre>
                      <br></br>
                      <span className="text-xl">id in vectorDB</span>
                      <pre className="text-base">
                        <b>{item.id}</b>
                      </pre>
                      <br></br>
                      <a href={"/debug?uuid=" + item.id} target="_blank" rel="noreferrer">
                        <button className="btn join-item">Tag this item!</button>
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ETHSpace;
