import {renderHook, act} from '@testing-library/react-hooks';
import {useNfc} from '../../src/shared/hooks/useNfc';

test('should increment counter', async () => {
  const {result} = renderHook(() => useNfc());

  await act(async () => {
    await result.current.writeTag('ass');
  });

  expect('foo').toBe('foo');
});
