import HeaderBox from '@/components/HeaderBox'
import { Pagination } from '@/components/Pagination';
import TransactionsTabel from '@/components/TransactionsTabel';
import { getAccount, getAccounts } from '@/lib/actions/bank.actions';
import { getLoggedInUser } from '@/lib/actions/user.actions';
import { formatAmount } from '@/lib/utils';
import { Search } from 'lucide-react'
import React from 'react'

const TransactionHistory = async ({ searchParams: { id, page } }: SearchParamProps) => {
  const currentPage = Number(page as string) || 1;
  const loggedIn = await getLoggedInUser();
  const accounts = await getAccounts({ userId: loggedIn.$id });

  if (!accounts) return;

  const accountsData = accounts?.data;
  const appwriteItemId = (id as string) || accountsData[0]?.appwriteItemId;

  const accountData = await getAccount({ appwriteItemId });
  const rowsPerPage = 10;
  const totalPages = Math.ceil(accountData?.transactions.length / rowsPerPage);

  const indexOfLastTransactions = currentPage * rowsPerPage;

  const indexOfFirstTransactions = indexOfLastTransactions - rowsPerPage;
  const currentTransactions = accountData?.transactions.slice(indexOfFirstTransactions,indexOfLastTransactions)
  return (
    <div className='transactios'>
      <div className='transactions-header'>
        <HeaderBox title='Transaction History'
        subtext='See your bank details and transactions.'/>

      </div>

      <div className="space-y-6">
      <div className="transactions-account">
      <div className="flex flex-col gap-2">
          <h2 className='text-18 font-bald text-white'>
          {accountData?.data.name}
          </h2>
          <p className='text-14 text-blue-25'>
            {accountData?.data.officialName}
          </p>
          <p className="text-14 font-semibold tracking-[1.1px] text-white">
              ●●●● ●●●● ●●●● <span className="text-16">{accountData?.data.mask}</span>
            </p>
        </div>
        <div className='transactions-account-balance'>
        <p className="text-14">Current balance</p>
            <p className="text-24 text-center font-bold">{formatAmount(accountData?.data.currentBalance)}</p>
          </div>
      </div>
      <section className='flex w-full flex-col gap-6'>
      <TransactionsTabel transactions={currentTransactions}/>
      {totalPages>1 && (
                <div className="m-4 w-full">
   <Pagination totalPages={totalPages} page={currentPage}/>    
                </div>

              )}

      </section>
    </div>
    </div>
  )
}

export default TransactionHistory