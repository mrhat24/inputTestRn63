import {renderHook, act} from '@testing-library/react-hooks';
import {useNfc} from '../../src/shared/hooks/useNfc';

test('should read nfc tag', async () => {
  const {result} = renderHook(() => useNfc());
  let r: string | undefined = undefined;
  await act(async () => {
    r = await result.current.readTag();
  });
  console.log(r);
  expect(r).toBeDefined();
});
