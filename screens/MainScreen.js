import React from 'react';
import { StyleSheet, Text, View,ScrollView,FlatList,TouchableOpacity} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Calendar } from 'react-native-calendars';
import DetailHeader from '../components/DetailHeader'
import WriteHeader from '../components/WriteHeader'

export default class MainScreen extends React.Component {
    static navigationOptions = {
        tabBarIcon: ({ tintColor }) => (
            <MaterialCommunityIcons name='calendar-multiselect' size={25} style={{ color: tintColor }} />
        )
    }
    constructor(props){
        super(props)
        this.state = {
            selectedDate: '',
            Posts: [{
                title: '오늘은 30일',
                content: '약속',
                id: 1,
                date: '2019-12-30',
            },
            {
                title: '내일은 31일',
                content: '여행가야지',
                id: 2,
                date: '2019-12-31',
            },
            ]
        }
    }
    state = {
        selectedDate :'',
        Posts:[
        {
            title : '오늘은 30일',
            content: '약속',
            date : '2019-12-30',
        },
        {
            title: '내일은 31일',
            content: '여행가야지',
            date: '2019-12-31',
        },
        ]
    }
    
    componentDidMount(){
        this.props.navigation.addListener(
        'didFocus',
        payload => {
            newpost = this.props.navigation.getParam('myparam')
            
            if (newpost ) {
                const PrevPosts = [...this.state.Posts]
                this.setState({ Posts: PrevPosts.concat(newpost) })
                this.props.navigation.navigate('MainScreen',{myparam: false })
            }
        }
    )
    }

    render(){
        return (
            console.log(this.state.selectedDate),
            <SafeAreaView style={styles.container}>
                <Calendar
                    onDayPress={(day) => { this.setState(this.state.selectedDate = day)} }
                    current={new Date()}/>
                <ScrollView>
                    <FlatList
                    data ={this.state.Posts.filter(data => { return data.date == this.state.selectedDate.dateString })}
                    renderItem ={({item, index})=>{
                        return (
                            <TouchableOpacity
                            onPress={() => {this.props.navigation.navigate('Detail',{post:item})}}
                            style = {styles.listitem}>
                            <View>
                                <Text style = {styles.listtext}>
                                    제목 : {item.title}
                                </Text>
                                <Text style={styles.listtext}>
                                    내용 : {item.content}
                                </Text>
                            </View>
                            </TouchableOpacity>
                        )
                    }}
                    keyExtractor = {(item, index) => {return `$(index)`}} />
                </ScrollView>
            </SafeAreaView>
        );
    }    
}

const styles = StyleSheet.create({
    listitem:{
        marginLeft:50,
        marginTop:30,
        borderLeftColor: "gray",
        borderLeftWidth: 4,
        paddingLeft:30,
    },
    container: {
        flex: 1,
        paddingTop:20,
        backgroundColor: 'gray',
    },
    textstyle:{
        fontSize:80,
    },
    listtext:{
        fontSize : 20,
    }
});
