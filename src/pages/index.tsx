import { type NextPage } from "next";
import { useState, ChangeEvent } from "react";
import { api } from "~/utils/api";

const Home: NextPage = () => {
  const [content, setContent] = useState("");
  const { isLoading, error, data, refetch } = api.note.fetch.useQuery();
  const createMutation = api.note.create.useMutation();
  const deleteMutation = api.note.delete.useMutation();

  if (error) {
    return <>Error</>;
  }

  const handleContentChange = (e: ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  const handleSaveClick = () => {
    createMutation.mutate({ content: content }, { onSuccess: () => refetch() });
    setContent("");
  };

  const handleDeleteClick = (id: number) => {
    deleteMutation.mutate({ id: id }, { onSuccess: () => refetch() });
  };

  return (
    <div>
      <nav className="bg-gray-800">
        <div className="mx-auto px-4">
          <div className="flex h-16 items-center">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <img
                  className="h-8 w-8"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                />
              </div>
            </div>
            <div className="flex items-center">
              <div className="ml-5 flex-shrink-0">
                <span className="font-medium text-[hsl(280,100%,70%)]">
                  T3 App
                </span>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <main>
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
                autoComplete="off"
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
                  <th className="w-40 border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold text-gray-600">
                    CreatedAt
                  </th>
                  <th className="w-40 border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold text-gray-600">
                    Content
                  </th>
                  <th className="border-b-2 bg-gray-100" />
                </tr>
              </thead>
              <tbody>
                {!isLoading ? (
                  data!.map((note) => (
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
      </main>
    </div>
  );
};

export default Home;
