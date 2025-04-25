import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

export const useApiStatus = (mutation, options = {}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  
  const { showSuccessToast = true, successMessage = 'Operation successful!' } = options;

  const [trigger, { isLoading: isMutationLoading, isError, error: mutationError, isSuccess }] = mutation;

  useEffect(() => {
    setIsLoading(isMutationLoading);
    if (isError) {
      setError(mutationError);
      toast.error(mutationError?.data?.message || 'Something went wrong');
    }
    if (isSuccess && showSuccessToast) {
      setSuccess(true);
      toast.success(successMessage);
    }
  }, [isMutationLoading, isError, mutationError, isSuccess, showSuccessToast, successMessage]);

  const reset = () => {
    setIsLoading(false);
    setError(null);
    setSuccess(false);
  };

  const execute = async (...args) => {
    try {
      reset();
      const result = await trigger(...args).unwrap();
      return result;
    } catch (err) {
      setError(err);
      throw err;
    }
  };

  return {
    isLoading,
    error,
    success,
    execute,
    reset
  };
};

export const useQueryStatus = (query) => {
  const { isLoading, isFetching, isError, error, data } = query;

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message || 'Failed to fetch data');
    }
  }, [isError, error]);

  return {
    isLoading: isLoading || isFetching,
    error,
    data
  };
};
