import StartChatWithQuestionButton from "@/components/atoms/StartChatWithQuestionButton";

const DATA = {
  video: {
    link: "https://www.youtube.com/embed/3_AoWp1tFMA",
    title: "Student Experience",
  },
  ChatButton: {
    href: "#Chat",
    text: "What is studying at Alphacrucis like?",
  },
};

export default function StudentExperience() {
  return (
    <div
      id="StudentExperience"
      className="flex flex-wrap p-4 space-y-4 h-screen lg:space-x-4 lg:space-y-0 lg:space-x-8 bg-gray-200"
    >
      <div className="flex flex-col self-start mt-10 w-full lg:w-5/12 lg:ml-10 space-y-8 lg:space-y-20">
        <h1 className="pt-4 mt-10 text-5xl capitalize tracking-normal leading-none border-orange-400 border-t-4">
          Student Experience
        </h1>

        <StartChatWithQuestionButton
          question={DATA.ChatButton.text}
          buttonClassName="inline-flex items-center rounded-md border uppercase border-transparent bg-orange-400 px-4 py-2 text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          bubbleClassName="-ml-1 mr-3 h-8 w-8"
          textClassName="self-center leading-none text-white text-md uppercase"
        />
      </div>
      <iframe
        lazy="true"
        className="flex justify-center flex-wrap p-4 w-full aspect-video space-y-4 lg:w-1/2 lg:pt-10"
        src={DATA.video.link}
        title={DATA.video.title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; web-share"
      />
    </div>
  );
}
