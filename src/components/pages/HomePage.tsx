import GetStarted from "../feature/home/GetStarted";

const TitleAndSubtitle = () => {
  return (
    <div>
      <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
        The fastest way to save notes anywhere
      </h1>
      <p className="mt-6 text-lg leading-8 text-foreground ">
        {
          "Let's try. Enter a new or used code now to open, encrypt and save notes with."
        }
      </p>
    </div>
  );
};

function PageComponent() {
  return (
    <>
      <div className="text-center">
        <TitleAndSubtitle />
        <GetStarted />
      </div>
    </>
  );
}

export default function HomePage() {
  return (
    <>
      <PageComponent />
    </>
  );
}
