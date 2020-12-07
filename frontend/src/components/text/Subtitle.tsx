import React, { PureComponent } from 'react'
import { SubtitleContainer } from './Subtitle.styled'



export class Subtitle extends PureComponent {
    render() {
        return (
            <SubtitleContainer>
                {this.props.children}
            </SubtitleContainer>
        )
    }
}

export default Subtitle
