export default interface IconsPartial {
    type: 'arrow-right' | 'arrow-left' | 'arrow-right-long' | 'chevron-down' | 'chevron-up' | 'chevron-left' | 'chevron-right' 
    | 'mouse' | 'checked' | 'close' | 'zoom-in' | 'zoom-out' | 'warning' | 'location' | 'play' | 'pause' | 'muted' | 'unmuted'
    colorScheme?: 'colorScheme1' | 'colorScheme2' | 'colorScheme4' |'white' | 'grey' | 'red' | 'bright' | 'dark'
    size?: 'small' | 'smaller' | 'medium' | 'large' | 'larger' | 'big' | 'xl'
    rotate?: number
    animate?: boolean
  }