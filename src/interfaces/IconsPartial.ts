export default interface IconsPartial {
    type: 'arrow-right' | 'arrow-left' | 'chevron-down' | 'mouse' | 'checked' | 'close' | 'zoom-in' | 'zoom-out' | 'warning' | 'location'
    colorScheme?: 'colorScheme1' | 'colorScheme2' | 'colorScheme4' |'white' | 'grey' | 'red' | 'bright' | 'dark'
    size?: 'small' | 'smaller' | 'medium' | 'large' | 'larger' | 'big' | 'xl'
    rotate?: number
    animate?: boolean
  }