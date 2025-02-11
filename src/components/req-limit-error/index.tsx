import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

const ReqLimitError = () => {
  return (
    <div className="flex justify-center items-center gap-3 mb-10">
      <ExclamationCircleIcon className="size-7" />
      <p>
        O limite de requisições por hora foi ultrapassado. Este projeto foi
        feito apenas para fins educacionais e utiliza a versão de demonstraçao
        da Unplash API. Por favor, volte mais tarde.
      </p>
    </div>
  );
};

export default ReqLimitError;
