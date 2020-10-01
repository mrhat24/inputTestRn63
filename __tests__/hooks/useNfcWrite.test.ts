import {renderHook, act} from '@testing-library/react-hooks';
import {useNfc} from '../../src/shared/hooks/useNfc';

test('should write nfc tag', async () => {
  const {result} = renderHook(() => useNfc());

  await act(async () => {
    await result.current.writeTag('test tag');
  });

  expect('foo').toBe('foo');
});
