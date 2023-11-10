import { TypedDispatch } from '@/app/providers/store-provider/config/store';
import { useDispatch } from 'react-redux';

export const useTypedDispatch = () => useDispatch<TypedDispatch>();
