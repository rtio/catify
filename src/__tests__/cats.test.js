import axios from 'axios';
import { fetchNextCat, createUpVote, createDownVote } from '../pages/api/cats';

jest.mock('axios');

describe('fetchNextCat', () => {
  it('returns the first cat image from the API', async () => {
    const response = {
      data: [
        {
          id: 'abc123',
          url: 'https://catimage.com/abc123.jpg',
        },
      ],
    };
    axios.get.mockResolvedValue(response);

    const cat = await fetchNextCat();
    expect(cat.id).toBe('abc123');
    expect(cat.url).toBe('https://catimage.com/abc123.jpg');
  });
});

describe('createUpVote', () => {
  it('sends a POST request to create an upvote for a cat image', async () => {
    axios.post.mockResolvedValue({ data: { message: 'SUCCESS' } });

    const result = await createUpVote('abc123');
    expect(result.message).toBe('SUCCESS');
    expect(axios.post).toHaveBeenCalledWith('/votes', {
      image_id: 'abc123',
      value: 1,
    });
  });
});

describe('createDownVote', () => {
  it('sends a POST request to create a downvote for a cat image', async () => {
    axios.post.mockResolvedValue({ data: { message: 'SUCCESS' } });

    const result = await createDownVote('abc123');
    expect(result.message).toBe('SUCCESS');
    expect(axios.post).toHaveBeenCalledWith('/votes', {
      image_id: 'abc123',
      value: -1,
    });
  });
});
