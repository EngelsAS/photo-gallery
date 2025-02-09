import { unsplash } from "../../api/unsplash";

const Test = () => {
  const fetchData = async () => {
    const resp = await unsplash.collections.list({ page: 1 });

    if (resp.type === "success") {
      console.log(resp.response.results);
    }
  };

  return (
    <div>
      <button onClick={fetchData} className="p-2 bg-black text-white">
        console
      </button>
      <button className="p-3 bg-amber-400 text-white rounded-md">
        botao 2
      </button>
    </div>
  );
};

export default Test;
