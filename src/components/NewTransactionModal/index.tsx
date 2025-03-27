import Modal from 'react-modal'

import closeImg from '../../../public/assets/close.svg'
import incomeImg from '../../../public/assets/income.svg'
import outcomeImg from '../../../public/assets/outcome.svg'
import clsx from 'clsx';

import { FormEvent, useState, useRef, useEffect } from 'react';
import { useTransactions } from '../../hooks/useTransactions';
import Image from 'next/image';

interface NewTransactionModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
}

const colors = {
    green: 'bg-emerald-300',
    red: 'bg-red-100',
};

export function NewTransactionModal({ isOpen, onRequestClose }:NewTransactionModalProps ) {
    const { createTransaction } = useTransactions();

    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [type, setType] = useState('deposit');

    const titleInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isOpen) {
            titleInputRef.current?.focus();
        }
    }, [isOpen]);

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        const numericValue = inputValue.replace(/[^0-9]/g, '');
        
        const sanitizedValue = numericValue.replace(/^0+/, '');
        const limitedValue = sanitizedValue.slice(0, 24);
        
        setAmount(limitedValue);
    };

    async function handleCreateNewTransaction (e: FormEvent) {
        e.preventDefault()
        
        await createTransaction({
            title,
            amount: amount === '' ? 0 : Number(amount),
            category,
            type,
        })
        setTitle('');
        setAmount('');
        setCategory('');
        setType('deposit');
        onRequestClose();
    }

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
            className="bg-white rounded-lg p-8 relative w-full max-w-lg mx-4"
            // suporte para fechar com ESC e clique fora
            shouldCloseOnOverlayClick={true}
            shouldCloseOnEsc={true}
            // Configurações de acessibilidade
            contentLabel="Cadastrar Transação"
            ariaHideApp={false}
        >
            <button
                type="button"
                onClick={onRequestClose}
                className="absolute top-9 right-9"
                aria-label="Fechar modal"
            >
                <Image src={closeImg} alt="Fechar modal" className="w-6 h-6" />
            </button>

            <form 
                onSubmit={handleCreateNewTransaction} 
                className="flex flex-col gap-3"
            >
                <h2 className="text-gray-900 text-xl mb-8">Cadastrar Transação</h2>

                <input
                    ref={titleInputRef}
                    placeholder="Título"
                    id='title'
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    className="w-full px-6 h-16 rounded-md border border-gray-300 bg-gray-200 font-normal text-base placeholder-gray-600"
                />
                <input
                    type="number"
                    id='amount'
                    min="0"
                    max="999999999999999999999999"
                    value={amount}
                    onChange={handleAmountChange}
                    placeholder="Valor"
                    className="w-full px-6 h-16 rounded-md border border-gray-300 bg-gray-200 font-normal text-base placeholder-gray-600"
                />

                <div className="my-2 grid grid-cols-2 gap-2">
                    <button
                        type="button"
                        onClick={() => { setType('deposit'); }}
                        className={clsx(
                            'h-16 border border-gray-300 rounded-md flex items-center justify-center transition-colors',
                            {
                                [colors.green]: type === 'deposit',
                            }
                        )}
                    >
                        <Image src={incomeImg} alt="Entrada" className="w-5 h-5" />
                        <span className="ml-4 text-base text-gray-900">Entrada</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => { setType('withdraw'); }}
                        className={clsx(
                            'h-16 border border-gray-300 rounded-md flex items-center justify-center transition-colors',
                            {
                                [colors.red]: type === 'withdraw',
                            }
                        )}
                    >
                        <Image src={outcomeImg} alt="Saída" className="w-5 h-5" />
                        <span className="ml-4 text-base text-gray-900">Saída</span>
                    </button>
                </div>

                <input
                    placeholder="Categoria"
                    id='category'
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    className="w-full px-6 h-16 rounded-md border border-gray-300 bg-gray-200 font-normal text-base placeholder-gray-600"
                />

                <button
                    type="submit"
                    className="w-full px-6 h-16 bg-emerald-500 text-white rounded-md border-0 text-base mt-4 font-semibold transition-filter duration-200 hover:brightness-90"
                >
                    Cadastrar
                </button>
            </form>
        </Modal>
    )
}
