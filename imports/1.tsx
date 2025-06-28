function Frame52145() {
  return (
    <div className="absolute bg-[#242424] h-[72px] left-[71px] rounded-xl top-24 w-[317px]" />
  );
}

function Frame52177() {
  return (
    <div className="box-border content-stretch flex flex-col gap-4 items-center justify-center p-0 relative shrink-0 w-[100px]">
      <div className="font-['Lexend:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#ffffff] text-[12px] text-center w-full">
        <p className="block leading-[1.5] whitespace-pre-wrap">{`Aufforderung  zur Auswahl`}</p>
      </div>
    </div>
  );
}

function Frame52178() {
  return (
    <div className="absolute bg-[#1d1d1d] left-[321px] rounded-[93.5px] size-[187px] top-[38px]">
      <div className="flex flex-col items-center justify-center relative size-full">
        <div className="box-border content-stretch flex flex-col gap-2.5 items-center justify-center px-[43px] py-[66px] relative size-[187px]">
          <Frame52177 />
        </div>
      </div>
    </div>
  );
}

function TextText() {
  return (
    <div
      className="bg-[#121212] bg-[rgba(255,255,255,0)] h-[54px] relative rounded shrink-0 w-[180px]"
      data-name="text/text"
    >
      <div className="flex flex-col items-center justify-center overflow-clip relative size-full">
        <div className="box-border content-stretch flex flex-col h-[54px] items-center justify-center px-4 py-2 relative w-[180px]">
          <div className="font-['Lexend:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[12px] text-[rgba(255,255,255,0)] text-left text-nowrap">
            <p className="block leading-[1.5] whitespace-pre">
              Professional Development
            </p>
          </div>
        </div>
      </div>
      <div className="absolute border border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none rounded" />
    </div>
  );
}

function TextText1() {
  return (
    <div
      className="bg-[#5bc47b] bg-[rgba(255,255,255,0)] h-[54px] relative rounded shrink-0 w-[180px]"
      data-name="text/text"
    >
      <div className="flex flex-col items-center justify-center overflow-clip relative size-full">
        <div className="box-border content-stretch flex flex-col h-[54px] items-center justify-center px-4 py-2 relative w-[180px]">
          <div className="font-['Lexend:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[12px] text-[rgba(255,255,255,0)] text-left text-nowrap">
            <p className="block leading-[1.5] whitespace-pre">Meeting</p>
          </div>
        </div>
      </div>
      <div className="absolute border border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none rounded" />
    </div>
  );
}

function TextText2() {
  return (
    <div
      className="bg-[#121212] bg-[rgba(255,255,255,0)] h-[54px] relative rounded shrink-0 w-[180px]"
      data-name="text/text"
    >
      <div className="flex flex-col items-center justify-center overflow-clip relative size-full">
        <div className="box-border content-stretch flex flex-col h-[54px] items-center justify-center px-4 py-2 relative w-[180px]">
          <div className="font-['Lexend:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[12px] text-[rgba(255,255,255,0)] text-left text-nowrap">
            <p className="block leading-[1.5] whitespace-pre">Internal Work</p>
          </div>
        </div>
      </div>
      <div className="absolute border border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none rounded" />
    </div>
  );
}

function Frame52143() {
  return (
    <div className="box-border content-stretch flex flex-col gap-5 items-start justify-center p-0 relative shrink-0">
      <TextText />
      <TextText1 />
      <TextText2 />
    </div>
  );
}

function Frame52180() {
  return (
    <div className="absolute box-border content-stretch flex flex-row gap-[57px] items-center justify-start left-[82px] p-0 top-[31px]">
      <Frame52143 />
    </div>
  );
}

export default function Component1() {
  return (
    <div className="bg-[#000000] relative size-full" data-name="1">
      <Frame52145 />
      <Frame52178 />
      <Frame52180 />
    </div>
  );
}