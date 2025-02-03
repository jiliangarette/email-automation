import EmailAutomation from "../components/EmailAutomation";

const HomePage = () => {
  return (
    <div className="flex flex-col w-screen h-screen bg-slate-100 place-items-center justify-center fixed">
      <EmailAutomation />
    </div>
  );
};

export default HomePage;
