"use client";

import { useState } from "react";

export default function Modal({
  title,
  description,
  extraDescription,
  visibility,
  ok,
  cancel,
}) {
  const [showModal, setShowModal] = useState(visibility);
  return (
    <>
      {showModal ? (
        <>
          <div className="justify-center flex overflow-x-hidden overflow-y-auto fixed inset-2 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                {title ? (
                  <div className="flex items-start justify-between p-4 rounded-t">
                    <h3 className="text-xl font-semibold">{title}</h3>
                    <button
                      className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => setShowModal(false)}
                    >
                      <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none"></span>
                    </button>
                  </div>
                ) : (
                  ""
                )}

                {description ? (
                  <div className="relative p-6 flex-auto">
                    <p className="my-4 text-slate-500 text-lg leading-relaxed">
                      {title}
                    </p>
                  </div>
                ) : (
                  ""
                )}

                {/*footer*/}
                <div className="flex items-center justify-end p-2 rounded-b">
                  {cancel ? (
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      {cancel}
                    </button>
                  ) : (
                    ""
                  )}
                  {ok ? (
                    <button
                      className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      {ok}
                    </button>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
