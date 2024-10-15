import Images from "../images/Images.tsx";

const Content = () => {
    return (
        <main>
            <section className = "bg-[url('/mountain.jpg')] bg-cover bg-no-repeat bg-center px-10 min-h-[20rem] flex flex-col gap-y-5 justify-center items-center bg-blend-overlay bg-gray-600">
                <h1 className = "text-white font-bold text-3xl text-center">
                    Download High Display Images by creators
                </h1>
                <p className = "text-center text-gray-300 ">
                    Over 2.4 million+ stock Images by our talented community
                </p>
            </section>
            <Images/>
        </main>
    );
};

export default Content;