import { NextPage } from "next";
import { useEffect, useState } from "react";

const ETHSpace: NextPage = () => {
  //在对后端发起请求后，将response的内容保存在results中
  const [result, setResult] = useState<{data:string,metadata:{}}[]>([{data:"The search results will be shown here",metadata:{}},]);
  //设置默认是在我们提供的数据集而不是公共数据集中查询
  const [qinPublic, setQinPublic] = useState(false);
  //获取目前提供的数据集选项
  const [options, setOptions] = useState<string[]>([]);
  //获取用户选择的数据集
  const [dataset, setDataset] = useState("");
  //获取用户搜索的prompt
  const [seaPrompt, setSeaPrompt] = useState("");
  //仅在组件挂载时执行一次获取数据集列表
  useEffect(() => {
      fetchOptions();
    // console.log(data);
  });

  //从后端获取数据集列表
  const fetchOptions = async () => {
    const response = await fetch("https://faasbyleeduckgo.gigalixirapp.com/api/v1/run?name=VectorAPI&func_name=get_cluster", {
      method: "POST",
      headers:{
        'Content-Type':'application/json;charset=utf-8',
      },
      body:JSON.stringify({
        "params": ["ai-based-smart-contract-explorer"]
      })
    });
    const data=await response.json();
    setOptions(data.result);
  };
  //获取search prompt与dataset名字后向后端发request
  const handleonClick = async() => {
    const response = await fetch("https://faasbyleeduckgo.gigalixirapp.com/api/v1/run?name=VectorAPI&func_name=search_data",{
      method:"POST",
      headers:{
        'Content-Type':'application/json; charset=utf-8',
      },
      body:JSON.stringify({
        "params": [dataset, seaPrompt, 5]
      })
    });
    const data=await response.json();
    // console.log(data.result.similarities);
    setResult(data.result.similarities);
  };
  return (
    <div className="grid lg:grid-cols-2 flex-grow">
      <div className="hero min-h-screen bg-base-200 bg-gradient-to-r from-green-500 to-blue-500">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-2xl font-bold">AI-based Smart Contract Explorer</h1>
            <p className="py-6">-- Smart Contract Search Platform based on AI<br></br>
              -- Let AI fully assist smart contract developers</p>
            <div className="form-control mb-6">
              <label className="label cursor-pointer">
                <span className="label-text text-2xl">Search in the Free Dataset:</span>
                <input
                  type="checkbox"
                  className="toggle toggle-accent"
                  checked={qinPublic}
                  onChange={() => {
                    setQinPublic(!qinPublic);
                  }}
                />
              </label>
            </div>
            <div className="join mb-6">
              <div>
                <div>
                  <input
                    style={{ width: "300px" }}
                    className="input input-bordered join-item"
                    value={seaPrompt}
                    onChange={(e) => {
                      setSeaPrompt(e.target.value);
                    }}
                    placeholder="Enter your prompt to search" />
                </div>
              </div>
              <div>
                <div>
                  {!qinPublic ? (
                    <select
                      className="select select-bordered join-item"
                      onChange={(e) => {
                        setDataset(e.target.value);
                      }}>
                      {
                        options.map((option, index) => (
                          <option key={index} value={option}>{option}</option>
                        ))
                      }
                    </select>
                  ) : (
                    <input
                      className="input input-bordered join-item"
                      value={dataset}
                      onChange={(e) => {
                        setDataset(e.target.value);
                      }}
                      placeholder="Pls input the public dataset name" />
                  )}
                </div>
              </div>
              <div className="indicator">
                <button className="btn join-item" onClick={() => {
                  handleonClick();
                }}>Search</button>
              </div>
            </div>
            <div className="hero-content text-left">
              <span className="text-sm">
                <p><b>A search question example: </b></p>
                <p>* Give me some function examples about NFT</p>
                <p>* 0x73c7448760517E3E6e416b2c130E3c6dB2026A1d</p>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gradient-to-r from-blue-500 to-green-500">
        <div className="mx-auto w-4/5 max-h-[600px] backdrop-blur-lg backdrop-filter p-10 m-10 rounded-lg opacity-80 shadow-md overflow-auto overflow-y-auto">
          <h2 className="text-4xl font-bold mb-1">Search Results</h2>
          <span className="text-2xl m-2">
            {result.map((res,index)=>(
              <div key={index}>
                <div className="divider"></div>
                <span className="text-xl">Data</span>
                <pre className="text-base mb-3">{res.data}</pre>
                <span className="text-xl">Metadata</span>
                <pre className="text-base">{JSON.stringify(res.metadata,null,2)}</pre>
              </div>
            ))}
          </span>
        </div>

      </div>
    </div>
  )
};

export default ETHSpace;