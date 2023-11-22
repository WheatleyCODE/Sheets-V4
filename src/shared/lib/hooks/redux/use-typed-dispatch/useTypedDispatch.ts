import { useDispatch } from 'react-redux';
import { TypedDispatch } from '@/app/providers/store-provider';

export const useTypedDispatch = () => useDispatch<TypedDispatch>();
