import { type Notes } from "@prisma/client";
import { type NextPage } from "next";
import { useState, useEffect, ChangeEvent } from "react";
import Main from "~/components/Main";
import Nav from "~/components/Nav";
import { api } from "~/utils/api";

const Home: NextPage = () => {
  const [content, setContent] = useState("");
  const [dataSource, setDataSource] = useState<Notes[]>([]);
  const notes = api.note.fetch.useQuery();
  const createMutation = api.note.create.useMutation();
  const deleteMutation = api.note.delete.useMutation();

  useEffect(() => {
    if (notes.isFetched) {
      setDataSource([...notes.data!]);
    }
  }, [notes.isFetched]);

  const handleContentChange = (e: ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  const handleSaveClick = () => {
    createMutation.mutate({ content: content });
    setContent("");
  };

  const handleDeleteClick = (id: number) => {
    deleteMutation.mutate({ id: id });
  };

  return (
    <div>
      <Nav />
      <Main>
        <div className="px-5 pt-5">
          <div className="grid grid-cols-3">
            <div className="col-span-2">
              <input
                id="content"
                type="text"
                placeholder="Content"
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                value={content}
                onChange={handleContentChange}
              />
            </div>
            <div className="col-span-1 pl-3">
              <button
                type="button"
                className="rounded-lg border border-blue-500 bg-blue-500 px-4 py-2 text-white transition duration-500 hover:bg-blue-600 focus:outline-none"
                onClick={handleSaveClick}
              >
                Save
              </button>
            </div>
          </div>
          <div className="pt-5">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold text-gray-600">
                    CreatedAt
                  </th>
                  <th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold text-gray-600">
                    Content
                  </th>
                  <th className="border-b-2 bg-gray-100" />
                </tr>
              </thead>
              <tbody>
                {Object.keys(dataSource).length > 0 ? (
                  dataSource.map((note) => (
                    <tr key={note.id}>
                      <td className="border-b border-gray-200 bg-white px-5 py-3 text-sm">
                        <div>
                          <p className="whitespace-no-wrap text-gray-900">
                            {note.createdAt.toLocaleDateString()}
                          </p>
                        </div>
                      </td>
                      <td className="border-b border-gray-200 bg-white px-5 py-3 text-sm">
                        <div>
                          <p className="whitespace-no-wrap text-gray-900">
                            {note.content}
                          </p>
                        </div>
                      </td>
                      <td className="border-b border-gray-200 px-5 py-3 text-right">
                        <button
                          type="button"
                          className="rounded-lg border border-red-500 bg-red-500 px-4 py-2 text-white transition duration-500 hover:bg-red-600 focus:outline-none"
                          onClick={() => handleDeleteClick(note.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr />
                )}
              </tbody>
            </table>
          </div>
        </div>
      </Main>
    </div>
  );
};

export default Home;
