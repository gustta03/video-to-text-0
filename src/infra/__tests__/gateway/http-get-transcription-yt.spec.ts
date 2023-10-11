import { SubtitleService } from '../../gateways/http-get-transcript' // Importe a classe e os tipos necessários

describe('SubtitleService', () => {
  let subtitleService: SubtitleService

  beforeEach(() => {
    subtitleService = new SubtitleService()
  })

  it('should fetch and parse subtitles', async () => {
    const videoID = 'tllrIeyZvvc' // real YouTube videoID
    const languageCodes = ['en']

    const subtitles = await subtitleService.getSubtitles(videoID, languageCodes)

    expect(subtitles).toHaveLength(1)

    const [subtitleData] = subtitles
    expect(subtitleData.title).toBe('Rodrigo Santoro on Heleno and His Heartthrob Status')
    expect(subtitleData.subtitles.en).toBeDefined()

    const [subtitleLine] = subtitleData.subtitles.en
    expect(subtitleLine).toHaveProperty('start')
    expect(subtitleLine).toHaveProperty('dur')
    expect(subtitleLine).toHaveProperty('text')
  })
})
