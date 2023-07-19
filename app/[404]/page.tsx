import Image from 'next/image';
import Link from 'next/link';

const Page404 = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen overflow-hidden">
      <div className="max-w-md mx-auto text-center items-center justify-center">
        <div className="flex items-center justify-center">
          <Image src={"/assets/404.gif"} width={100} height={100} alt='' />
        </div>
        <h1 className="text-4xl font-bold text-sky-400 mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4"><span className='text-sky-400'>Oops!</span> Halaman tidak ditemukan</h2>
        <p className="mb-6">Maaf, kami tidak dapat menemukan halaman yang Anda cari. Pastikan URL yang Anda masukkan benar.</p>
        <Link href={"/"} className="inline-block bg-sky-400 text-white py-2 px-4 rounded-lg hover:bg-sky-600 transition duration-300 ease-in-out">Kembali ke Halaman Utama</Link>
      </div>
    </div>
  );
};

export default Page404;
