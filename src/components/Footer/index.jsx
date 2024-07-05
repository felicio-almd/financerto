import Image from 'next/image'
import LogoGit from '../../../public/assets/Github.svg'
import Link from 'next/link'

export function Footer () {
    return (
        <div className="self-center flex gap-10 mt-auto">
            <Link target="_blank" rel="noopener noreferrer" href='https://www.linkedin.com/in/felicio-rodney-almeida-rocha/' className='rounded-lg border border-black hover:bg-slate-500 px-3 py-2'>Made by Felicio - 2024</Link>
            <Link target="_blank" rel="noopener noreferrer" href='http://github.com/felicio-almd' className='flex gap-2 items-center cursor-pointer border border-black hover:bg-slate-500 rounded-lg px-3 py-2'>
                <Image src={LogoGit} alt='github' width={20}/>
                <p className='text-sm font-semibold'>GitHub</p>
            </Link>
        </div>
    )
}