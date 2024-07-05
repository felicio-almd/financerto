import Image from 'next/image'
import LogoGit from '../../../public/assets/Github.svg'
import Link from 'next/link'

export function Footer () {
    return (
        <div className="self-center flex gap-10 py-4 ">
            <Link target="_blank" rel="noopener noreferrer" href='https://www.linkedin.com/in/felicio-rodney-almeida-rocha/' className='rounded-lg border border-black hover:bg-slate-500 px-2 py-1 text-xs'>Made by Felicio - 2024</Link>
            <Link target="_blank" rel="noopener noreferrer" href='http://github.com/felicio-almd' className='flex gap-2 items-center cursor-pointer border border-black hover:bg-slate-500 rounded-lg px-2 py-'>
                <Image className='bg-black rounded-md p-[2px]' src={LogoGit} alt='github' width={20}/>
                <p className='text-xs font-semibold'>GitHub</p>
            </Link>
        </div>
    )
}