import Layout from "../components/Layout";
import Image from "next/image";

const Contact = () => {
    return <Layout title="Contact">
        <div className="bg-white text-center shadow-xl p-8 w-80 rounded">
            <div className="mt-4">
                <p className="font-bold">Contact info</p>
            </div>
            <div className="flex justify-center mt-4">
                <Image
                    className="rounded-full"
                    src="/tehon.jpg"
                    width={100}
                    height={100}
                    alt="tehon"
                />
            </div>
            <div className="mt-4">
                <p className="font-bold mt-3">Adress</p>
                <p className="text-xs mt-2 text-gray-600 ">Fukuoka Munakata</p>
                <p className="font-bold mt-3">E-mail</p>
                <p className="text-xs mt-2 text-gray-600 ">hoshimotoyasunori@gmail.com</p>
                <p className="font-bold mt-3">Phone</p>
                <p className="text-xs mt-2 text-gray-600 ">080-4012-4230</p>
            </div>
            <div className="mt-6 flex justify-around">
                <a
                href="https://www.facebook.com/tehon.24"
                target="_blank"
                rel="noopener noreferrer"
                >
                    <span className="h-4 ml-2">
                        <Image src="/facebook.png" alt="facebook Logo" width={30} height={30} />
                    </span>
                </a>
                <a
                href="https://www.instagram.com/tehon24/"
                target="_blank"
                rel="noopener noreferrer"
                >
                    <span className="h-4 ml-2">
                        <Image src="/insta.png" alt="insta Logo" width={30} height={30} />
                    </span>
                </a>
                <a
                href="https://twitter.com/tehon24"
                target="_blank"
                rel="noopener noreferrer"
                >
                    <span className="h-4 ml-2">
                        <Image src="/twitter.jpeg" alt="twitter Logo" width={30} height={30} />
                    </span>
                </a>
                <a
                href="https://github.com/hoshimotoyasunori"
                target="_blank"
                rel="noopener noreferrer"
                >
                    <span className="h-4 ml-2">
                        <Image src="/github.png" alt="github Logo" width={30} height={30} />
                    </span>
                </a>
            </div>
        </div>
    </Layout>;
};

export default Contact;
