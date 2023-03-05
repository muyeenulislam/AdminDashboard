export default function LoginPhoto() {
  return (
    <div className="mb-4">
      <picture>
        <img
          className="w-20 h-auto border-solid border-2 border-white rounded-full  ml-auto mr-auto mb-5"
          src="/ezwage.png"
          alt="company logo"
        />
      </picture>
      <h2 className="mb-5 text-4xl font-bold text-[#0EA8E1]">EZ Wage</h2>
      <p className="font-light text-sm">Login in to your Ez Wage account</p>
    </div>
  );
}
