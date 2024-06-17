export default function Home() {
  return (
    <>
      <div className='bg-transparent opacity-0 h-[360px]' />
      <div
        className='w-full flex items-center justify-center absolute left-0 top-[43px] h-[360px] p-8'
        style={ {
          backgroundImage: `url(/home-background.jpg)`,
          objectFit: 'cover',
          backgroundPosition: 'center',
        } }
      >
        <div className='flex flex-col items-center gap-10'>
          <h1 className='text-3xl text-white bg-black bg-opacity-80 px-3 py-2'>
            Добро пожаловать на площадку GWalt
          </h1>
          <h1 className='text-xl text-white text-wrap w-[825px] text-center bg-black bg-opacity-80 px-3 py-2'>
            Слушайте треки своих любимых исполнителей и получайте удовольствие.
            Ничего лишнего, только вы и музыка
          </h1>
        </div>
      </div>
    </>
  );
}
